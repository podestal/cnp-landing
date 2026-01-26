import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { QrCode, X, Camera, Loader2, AlertCircle } from 'lucide-react'
import { Html5Qrcode } from 'html5-qrcode'

interface QrCodeScannerProps {
  onQrCodeScanned: (qrCode: string) => void
  onClose: () => void
  participantName: string
  isLinking?: boolean
}

const QrCodeScanner = ({ onQrCodeScanned, onClose, participantName, isLinking = false }: QrCodeScannerProps) => {
  const [isScanning, setIsScanning] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [hasPermission, setHasPermission] = useState<boolean | null>(null)
  const scannerRef = useRef<Html5Qrcode | null>(null)
  const scannerElementId = 'qr-reader'
  const isProcessingRef = useRef(false) // Prevent multiple scans

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
      // Cleanup: stop scanner when component unmounts
      stopScanning()
    }
  }, [])

  const startScanning = async () => {
    try {
      setError(null)
      isProcessingRef.current = false // Reset processing flag
      
      // Set scanning state first to show the container
      setIsScanning(true)
      
      // Wait a bit for DOM to update
      await new Promise(resolve => setTimeout(resolve, 100))
      
      // Create scanner instance if it doesn't exist
      if (!scannerRef.current) {
        scannerRef.current = new Html5Qrcode(scannerElementId)
      }

      const scanner = scannerRef.current

      // Start scanning
      await scanner.start(
        { facingMode: 'environment' }, // Use back camera on mobile
        {
          fps: 10,
          qrbox: function(viewfinderWidth, viewfinderHeight) {
            // Make qrbox 80% of the viewfinder size to match our overlay
            const minEdgePercentage = 0.8
            const minEdgeSize = Math.min(viewfinderWidth, viewfinderHeight)
            const qrboxSize = Math.floor(minEdgeSize * minEdgePercentage)
            return {
              width: qrboxSize,
              height: qrboxSize
            }
          },
          aspectRatio: 1.0,
          disableFlip: false, // Allow QR codes in any orientation
        },
        (decodedText) => {
          // QR code successfully scanned - only process once
          // Stop scanning immediately after successful scan to prevent multiple calls
          if (!isProcessingRef.current) {
            isProcessingRef.current = true
            stopScanning()
            onQrCodeScanned(decodedText)
          }
        },
        (errorMessage) => {
          // Ignore scanning errors, just keep scanning
          // Only log if it's not a common "not found" error
          if (!errorMessage.includes('No QR code found')) {
            // Silently continue scanning
          }
        }
      )
    } catch (err: any) {
      console.error('Error starting scanner:', err)
      setError(err.message || 'Error al iniciar el escáner. Asegúrate de permitir el acceso a la cámara.')
      setIsScanning(false)
    }
  }

  const stopScanning = async () => {
    if (scannerRef.current && isScanning) {
      try {
        await scannerRef.current.stop()
        await scannerRef.current.clear()
      } catch (err) {
        console.error('Error stopping scanner:', err)
      }
      scannerRef.current = null
    }
    setIsScanning(false)
    // Reset processing flag after a delay to allow for new scans if needed
    // setTimeout(() => {
    //   isProcessingRef.current = false
    // }, 1000)
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
                  {/* QR Scanner Container - html5-qrcode will render video here */}
                  <div
                    id={scannerElementId}
                    className="w-full h-full"
                    style={{ 
                      display: isScanning ? 'block' : 'none',
                      position: 'relative',
                      zIndex: 1,
                      width: '100%',
                      height: '100%'
                    }}
                  />
                  {/* Add CSS to ensure html5-qrcode video is visible */}
                  {isScanning && (
                    <style>{`
                      #${scannerElementId} video {
                        width: 100% !important;
                        height: 100% !important;
                        object-fit: cover !important;
                      }
                      #${scannerElementId} canvas {
                        display: none !important;
                      }
                    `}</style>
                  )}
                  
                  {!isScanning && (
                    <div className="absolute inset-0 flex items-center justify-center bg-gray-900 z-10">
                      <div className="text-center text-white">
                        <Camera className="w-16 h-16 mx-auto mb-4 opacity-50" />
                        <p className="text-sm opacity-75">Presiona "Iniciar Escaneo" para comenzar</p>
                      </div>
                    </div>
                  )}

                  {/* Scanning overlay frame - shown when scanning, positioned above scanner */}
                  {isScanning && (
                    <div className="absolute inset-0 pointer-events-none flex items-center justify-center z-30">
                      <div className="w-4/5 h-4/5 border-4 border-green-500 rounded-lg shadow-2xl">
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
                    className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg w-full max-w-md"
                  >
                    <p className="text-sm text-red-600">{error}</p>
                  </motion.div>
                )}

                {isLinking ? (
                  <div className="w-full max-w-md flex flex-col items-center gap-4">
                    <div className="flex items-center gap-3 px-6 py-4 bg-blue-50 border border-blue-200 rounded-lg">
                      <Loader2 className="w-5 h-5 text-blue-600 animate-spin" />
                      <p className="text-blue-800 font-medium">Vinculando código QR...</p>
                    </div>
                  </div>
                ) : (
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
                      disabled={isLinking}
                      className="px-6 py-3 bg-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Manual
                    </button>
                  </div>
                )}

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
