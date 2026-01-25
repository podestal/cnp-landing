import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { QrCode, X, Camera, Loader2, AlertCircle } from 'lucide-react'

interface QrCodeScannerProps {
  onQrCodeScanned: (qrCode: string) => void
  onClose: () => void
  participantName: string
}

const QrCodeScanner = ({ onQrCodeScanned, onClose, participantName }: QrCodeScannerProps) => {
  const [isScanning, setIsScanning] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [hasPermission, setHasPermission] = useState<boolean | null>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const streamRef = useRef<MediaStream | null>(null)

  useEffect(() => {
    // Check for camera permission
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then(() => {
        setHasPermission(true)
      })
      .catch(() => {
        setHasPermission(false)
        setError('No se pudo acceder a la cámara. Por favor, permite el acceso a la cámara en la configuración del navegador.')
      })

    return () => {
      // Cleanup: stop camera stream when component unmounts
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop())
      }
    }
  }, [])

  const startScanning = async () => {
    try {
      setError(null)
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment' } // Use back camera on mobile
      })
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream
        streamRef.current = stream
        setIsScanning(true)
        
        // TODO: Initialize QR code scanner library here
        // Example with html5-qrcode:
        // const html5QrCode = new Html5Qrcode("qr-reader");
        // await html5QrCode.start(
        //   { facingMode: "environment" },
        //   {
        //     fps: 10,
        //     qrbox: { width: 250, height: 250 }
        //   },
        //   (decodedText) => {
        //     onQrCodeScanned(decodedText)
        //     stopScanning()
        //   },
        //   (errorMessage) => {
        //     // Ignore errors, just keep scanning
        //   }
        // )
      }
    } catch (err) {
      setError('Error al iniciar la cámara. Asegúrate de permitir el acceso a la cámara.')
      setIsScanning(false)
    }
  }

  const stopScanning = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop())
      streamRef.current = null
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null
    }
    setIsScanning(false)
  }

  const handleManualInput = () => {
    const qrCode = prompt('Ingresa el código QR manualmente:')
    if (qrCode && qrCode.trim()) {
      onQrCodeScanned(qrCode.trim())
    }
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
          className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <QrCode className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-800">Escanear Código QR</h3>
                <p className="text-sm text-gray-600">{participantName}</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-gray-600" />
            </button>
          </div>

          {/* Scanner Area */}
          <div className="flex-1 p-6 flex flex-col items-center justify-center">
            {hasPermission === false ? (
              <div className="text-center">
                <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
                <p className="text-gray-700 mb-4">{error}</p>
                <button
                  onClick={handleManualInput}
                  className="px-6 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors"
                >
                  Ingresar Código Manualmente
                </button>
              </div>
            ) : (
              <>
                <div className="relative w-full max-w-md aspect-square bg-black rounded-lg overflow-hidden mb-6">
                  <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    muted
                    className="w-full h-full object-cover"
                    style={{ display: isScanning ? 'block' : 'none' }}
                  />
                  
                  {!isScanning && (
                    <div className="absolute inset-0 flex items-center justify-center bg-gray-900">
                      <div className="text-center text-white">
                        <Camera className="w-16 h-16 mx-auto mb-4 opacity-50" />
                        <p className="text-sm opacity-75">Presiona "Iniciar Escaneo" para comenzar</p>
                      </div>
                    </div>
                  )}

                  {/* Scanning overlay frame */}
                  {isScanning && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-64 h-64 border-4 border-green-500 rounded-lg shadow-lg">
                        <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-green-500 rounded-tl-lg" />
                        <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-green-500 rounded-tr-lg" />
                        <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-green-500 rounded-bl-lg" />
                        <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-green-500 rounded-br-lg" />
                      </div>
                    </div>
                  )}
                </div>

                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg"
                  >
                    <p className="text-sm text-red-600">{error}</p>
                  </motion.div>
                )}

                <div className="flex gap-3 w-full max-w-md">
                  {!isScanning ? (
                    <button
                      onClick={startScanning}
                      className="flex-1 px-6 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
                    >
                      <Camera className="w-5 h-5" />
                      Iniciar Escaneo
                    </button>
                  ) : (
                    <button
                      onClick={stopScanning}
                      className="flex-1 px-6 py-3 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition-colors flex items-center justify-center gap-2"
                    >
                      <X className="w-5 h-5" />
                      Detener Escaneo
                    </button>
                  )}
                  
                  <button
                    onClick={handleManualInput}
                    className="px-6 py-3 bg-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-300 transition-colors"
                  >
                    Manual
                  </button>
                </div>

                <p className="mt-4 text-sm text-gray-500 text-center">
                  Coloca el código QR dentro del marco para escanearlo
                </p>
              </>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

export default QrCodeScanner
