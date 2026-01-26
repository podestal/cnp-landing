import { useState, useCallback, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Loader2, CheckCircle2 } from 'lucide-react'
import { useGetActivities } from '../../../../hooks/api/activity/useGetActivities'
import { useUpdateParticipantByQR } from '../../../../hooks/api/participant/useUpdateParticipantByQR'
import { useNotificationStore } from '../../../../utils/notificationStore'
import QrCodeScanner from '../register/QrCodeScanner'
import type { Activity } from '../../../../services/api/activityService'

const ActivityScanTab = () => {
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(null)
  const [showScanner, setShowScanner] = useState(false)
  const [lastScannedQR, setLastScannedQR] = useState<string | null>(null)
  const [lastSuccessMessage, setLastSuccessMessage] = useState<string | null>(null)
  const hasProcessedQrRef = useRef<string | null>(null)
  const isProcessingRef = useRef(false)
  
  const { data: activities, isLoading, error } = useGetActivities()
  const updateParticipantByQR = useUpdateParticipantByQR()
  const addNotification = useNotificationStore((state: ReturnType<typeof useNotificationStore.getState>) => state.addNotification)

  // Handle QR code scanned - keep scanner open and process immediately
  // This must be defined before early returns to follow React hooks rules
  const handleQrCodeScanned = useCallback(async (qrCode: string) => {
    if (!selectedActivity) return
    
    // Prevent multiple requests for the same QR code
    if (hasProcessedQrRef.current === qrCode || isProcessingRef.current) {
      return
    }
    
    // Prevent if already processing
    if (updateParticipantByQR.isPending) {
      return
    }
    
    // Mark as processing and prevent duplicate scans
    isProcessingRef.current = true
    hasProcessedQrRef.current = qrCode
    
    try {
      const response = await updateParticipantByQR.mutateAsync({
        qr: qrCode,
        activity_id: selectedActivity.id,
      })
      
      // Show success message
      setLastScannedQR(qrCode)
      setLastSuccessMessage(`QR escaneado exitosamente: ${qrCode}`)
      
      addNotification({
        type: 'success',
        message: response.message || `Participante registrado exitosamente en ${selectedActivity.name}`,
      })
      
      // Clear the processed QR after a short delay to allow scanning again
      setTimeout(() => {
        hasProcessedQrRef.current = null
        setLastScannedQR(null)
        setLastSuccessMessage(null)
      }, 2000)
    } catch (error: any) {
      console.error('Error updating participant by QR:', error)
      
      const errorMessage = error?.response?.data?.message || error?.response?.data?.error || error?.message || ''
      
      if (errorMessage.includes('already') || errorMessage.includes('duplicate') || errorMessage.includes('ya está')) {
        addNotification({
          type: 'error',
          message: errorMessage || 'El participante ya está registrado en esta actividad.',
        })
      } else {
        addNotification({
          type: 'error',
          message: errorMessage || 'Error al registrar el participante. Por favor, intenta nuevamente.',
        })
      }
      
      // Reset after error to allow retry
      setTimeout(() => {
        hasProcessedQrRef.current = null
      }, 2000)
    } finally {
      isProcessingRef.current = false
    }
  }, [selectedActivity, updateParticipantByQR, addNotification])

  // Filter only active activities for the selector
  const activeActivities = activities?.filter(activity => activity.is_active) || []

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="w-8 h-8 animate-spin text-green-600" />
      </div>
    )
  }

  if (error) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-red-50 border border-red-200 rounded-lg p-4"
      >
        <p className="text-red-600">Error al cargar actividades. Por favor, intenta nuevamente.</p>
      </motion.div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Activity Selector */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl shadow-lg p-6"
      >
        <h2 className="text-xl font-bold text-gray-800 mb-4">Seleccionar Actividad</h2>
        {activeActivities.length > 0 ? (
          <div>
            <label htmlFor="activity-select" className="block text-sm font-medium text-gray-700 mb-2">
              Actividad
            </label>
            <select
              id="activity-select"
              value={selectedActivity?.id || ''}
              onChange={(e) => {
                const activityId = parseInt(e.target.value)
                const activity = activities?.find(a => a.id === activityId) || null
                setSelectedActivity(activity)
                // Reset scanner state when activity changes
                setShowScanner(false)
                setLastScannedQR(null)
                setLastSuccessMessage(null)
                hasProcessedQrRef.current = null
              }}
              className="block w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 text-gray-900 bg-white"
            >
              <option value="">Selecciona una actividad</option>
              {activeActivities.map((activity) => (
                <option key={activity.id} value={activity.id}>
                  {activity.name} - {activity.day} {activity.time}
                </option>
              ))}
            </select>
          </div>
        ) : (
          <p className="text-gray-600">No hay actividades activas disponibles</p>
        )}
      </motion.div>

      {/* QR Scanner Section */}
      {selectedActivity && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-lg p-6"
        >
          <h2 className="text-xl font-bold text-gray-800 mb-4">
            Escanear Código QR - {selectedActivity.name}
          </h2>
          <p className="text-gray-600 mb-4">
            Escanea el código QR del participante para registrarlo en esta actividad
          </p>

          {/* Success Message */}
          {lastSuccessMessage && lastScannedQR && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="mb-4 p-4 bg-green-50 border-2 border-green-500 rounded-lg"
            >
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-6 h-6 text-green-600" />
                <div>
                  <p className="font-semibold text-green-800">
                    {lastSuccessMessage}
                  </p>
                </div>
              </div>
            </motion.div>
          )}

          {/* Loading state */}
          {updateParticipantByQR.isPending && (
            <div className="mb-4 p-4 bg-blue-50 border border-blue-200 rounded-lg flex items-center gap-3">
              <Loader2 className="w-5 h-5 text-blue-600 animate-spin" />
              <p className="text-blue-800">Procesando código QR...</p>
            </div>
          )}

          {/* Scanner Button - Only show when scanner is closed */}
          {!showScanner && (
            <button
              onClick={() => setShowScanner(true)}
              className="w-full px-6 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors duration-200 flex items-center justify-center gap-2"
            >
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ repeat: Infinity, duration: 2 }}
              >
                📷
              </motion.div>
              Iniciar Escaneo Continuo
            </button>
          )}

          {/* Scanner Component - Stays open once started */}
          <AnimatePresence>
            {showScanner && (
              <QrCodeScanner
                onQrCodeScanned={handleQrCodeScanned}
                onClose={() => {
                  setShowScanner(false)
                  hasProcessedQrRef.current = null
                  setLastScannedQR(null)
                  setLastSuccessMessage(null)
                }}
                participantName={selectedActivity.name}
                isLinking={updateParticipantByQR.isPending}
              />
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </div>
  )
}

export default ActivityScanTab
