import { motion } from 'framer-motion'
import { useRef, useState } from 'react'
import { 
  Users, 
  CheckCircle2, 
  XCircle, 
  TrendingUp, 
  Calendar,
  FileText,
  BarChart3,
  PieChart,
  Activity,
  Download
} from 'lucide-react'
import { 
  BarChart, 
  Bar, 
  PieChart as RechartsPieChart, 
  Pie, 
  Cell, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts'
import { useGetAllParticipants } from '../../../hooks/api/participant/useGetAllParticipants'
import { useGetCompanions } from '../../../hooks/api/companion/useGetCompanions'
import type { Participant } from '../../../services/api/participantService'

const COLORS = ['#10b981', '#ef4444', '#3b82f6', '#f59e0b', '#8b5cf6', '#ec4899']

const ParticipantsReport = () => {
  const reportRef = useRef<HTMLDivElement>(null)
  const [isDownloading, setIsDownloading] = useState(false)
  
  // Get all participants for the report (no pagination)
  const { data: participantsData, isLoading } = useGetAllParticipants()
  const participants = participantsData || []
  
  // Get all companions for the report
  const { data: companionsData, isLoading: isLoadingCompanions } = useGetCompanions()
  const companions = companionsData || []

  // Calculate metrics
  const count = participants.length
  const total_active = participants.filter((p: Participant) => p.is_active).length
  const total_inactive = participants.filter((p: Participant) => !p.is_active).length
  const activePercentage = count > 0 ? ((total_active / count) * 100).toFixed(1) : 0
  const inactivePercentage = count > 0 ? ((total_inactive / count) * 100).toFixed(1) : 0
  
  // Calculate companion metrics
  const totalCompanions = companions.length
  const activeCompanions = companions.filter((c: { is_active?: boolean }) => c.is_active).length
  const inactiveCompanions = companions.filter((c: { is_active?: boolean }) => !c.is_active).length
  const activeCompanionsPercentage = totalCompanions > 0 ? ((activeCompanions / totalCompanions) * 100).toFixed(1) : 0
  const participantsWithCompanions = new Set(companions.map((c: { participant: number }) => c.participant)).size
  const avgCompanionsPerParticipant = count > 0 ? (totalCompanions / count).toFixed(2) : 0

  // Group by registration date (simplified - using created_at)
  const registrationsByDate = participants.reduce((acc: Record<string, number>, participant: Participant) => {
    if (participant.created_at) {
      const date = new Date(participant.created_at).toLocaleDateString('es-ES', { 
        month: 'short', 
        day: 'numeric' 
      })
      acc[date] = (acc[date] || 0) + 1
    }
    return acc
  }, {})

  const registrationData = Object.entries(registrationsByDate)
    .map(([date, count]) => ({ date, count: count as number }))
    .sort((a, b) => {
      const dateA = new Date(a.date)
      const dateB = new Date(b.date)
      return dateA.getTime() - dateB.getTime()
    })
    .slice(-30) // Last 30 days

  // Status distribution for pie chart (participants)
  const participantStatusData = [
    { name: 'Activos', value: total_active, color: '#10b981' },
    { name: 'Inactivos', value: total_inactive, color: '#ef4444' },
  ]

  // Status distribution for pie chart (companions)
  const companionStatusData = [
    { name: 'Activos', value: activeCompanions, color: '#10b981' },
    { name: 'Inactivos', value: inactiveCompanions, color: '#ef4444' },
  ]

  // Companions by registration date
  const companionsByDate = companions.reduce((acc: Record<string, number>, companion: { created_at?: string }) => {
    if (companion.created_at) {
      const date = new Date(companion.created_at).toLocaleDateString('es-ES', { 
        month: 'short', 
        day: 'numeric' 
      })
      acc[date] = (acc[date] || 0) + 1
    }
    return acc
  }, {})

  const companionRegistrationData = Object.entries(companionsByDate)
    .map(([date, count]) => ({ date, count: count as number }))
    .sort((a, b) => {
      const dateA = new Date(a.date)
      const dateB = new Date(b.date)
      return dateA.getTime() - dateB.getTime()
    })
    .slice(-30) // Last 30 days

  const dailyCompanionRegistrations = companionRegistrationData.map(item => ({
    date: item.date,
    registrations: item.count,
  }))

  // Daily registrations for area chart
  const dailyRegistrations = registrationData.map(item => ({
    date: item.date,
    registrations: item.count,
  }))

  // Calculate growth rate (comparing last 7 days vs previous 7 days)
  const last7Days = registrationData.slice(-7).reduce((sum, item) => sum + item.count, 0)
  const previous7Days = registrationData.slice(-14, -7).reduce((sum, item) => sum + item.count, 0)
  const growthRate = previous7Days > 0 
    ? (((last7Days - previous7Days) / previous7Days) * 100).toFixed(1)
    : '0.0'

  const handleDownloadPDF = async () => {
    if (!reportRef.current) return

    setIsDownloading(true)
    let clonedElement: HTMLElement | null = null
    
    try {
      // Wait a bit for any animations or charts to fully render
      await new Promise(resolve => setTimeout(resolve, 500))
      
      const element = reportRef.current
      
      // Clone the element to avoid modifying the original
      clonedElement = element.cloneNode(true) as HTMLElement
      clonedElement.style.position = 'absolute'
      clonedElement.style.left = '-9999px'
      clonedElement.style.top = '0'
      clonedElement.style.width = element.offsetWidth + 'px'
      clonedElement.style.backgroundColor = '#ffffff'
      document.body.appendChild(clonedElement)
      
      // Function to convert all computed styles to inline RGB styles
      const convertStylesToRgb = (originalEl: Element, clonedEl: Element) => {
        try {
          const originalHtml = originalEl as HTMLElement
          const clonedHtml = clonedEl as HTMLElement
          
          if (!originalHtml || !clonedHtml) return
          
          // Get all computed styles from original element
          const computed = window.getComputedStyle(originalHtml)
          
          // Get all CSS properties
          const allProps: string[] = []
          for (let i = 0; i < computed.length; i++) {
            const prop = computed[i]
            if (prop) {
              allProps.push(prop)
            }
          }
          
          // Apply ALL computed styles as inline styles
          // Browser has already converted oklch to RGB in computed styles
          allProps.forEach((prop) => {
            try {
              const value = computed.getPropertyValue(prop)
              if (value && value.trim() !== '' && value !== 'none' && value !== 'normal') {
                // Skip problematic properties
                if (!prop.includes('transform') && !prop.includes('transition') && 
                    !prop.includes('animation') && !prop.includes('filter') &&
                    !prop.includes('backdrop') && !prop.includes('clip') &&
                    !prop.includes('pointer-events')) {
                  clonedHtml.style.setProperty(prop, value, 'important')
                }
              }
            } catch (e) {
              // Ignore errors for individual properties
            }
          })
          
          // Recursively process children
          const originalChildren = Array.from(originalEl.children)
          const clonedChildren = Array.from(clonedEl.children)
          
          originalChildren.forEach((originalChild, index) => {
            if (clonedChildren[index]) {
              convertStylesToRgb(originalChild, clonedChildren[index])
            }
          })
        } catch (e) {
          console.warn('Error converting styles for element:', e)
        }
      }
      
      // Convert all styles to RGB
      convertStylesToRgb(element, clonedElement)

      // Force the cloned report to fill the A4 width (keep centered layout)
      const a4WidthPx = Math.round((210 / 25.4) * 96) // A4 width in px @ 96dpi
      clonedElement.style.width = `${a4WidthPx}px`
      clonedElement.style.maxWidth = `${a4WidthPx}px`
      clonedElement.style.minWidth = `${a4WidthPx}px`
      clonedElement.style.margin = '0 auto'
      clonedElement.style.padding = '0'
      clonedElement.style.boxSizing = 'border-box'

      const maxWidthContainers = clonedElement.querySelectorAll(
        '.max-w-7xl, .max-w-6xl, .max-w-5xl, .max-w-4xl, .max-w-3xl, .max-w-2xl, .max-w-xl, .mx-auto'
      )
      maxWidthContainers.forEach((el) => {
        const htmlEl = el as HTMLElement
        htmlEl.style.maxWidth = '100%'
        htmlEl.style.width = '100%'
        htmlEl.style.marginLeft = 'auto'
        htmlEl.style.marginRight = 'auto'
      })
      
      // Wait for styles to apply
      await new Promise(resolve => setTimeout(resolve, 300))
      
      // Use dom-to-image-more to capture the element (handles oklch better)
      let canvas: HTMLCanvasElement | null = null
      
      try {
        const domtoimage = await import('dom-to-image-more')
        
        // Optimize capture speed while keeping readable quality
        const scale = 2
        const width = 600
        const height = clonedElement.scrollHeight
        
        const dataUrl = await domtoimage.toJpeg(clonedElement, {
          quality: 0.35,
          bgcolor: '#ffffff',
          width: width * scale,
          height: height * scale,
        })
        
        // Convert data URL to canvas
        const img = new Image()
        img.src = dataUrl
        await new Promise<void>((resolve, reject) => {
          img.onload = () => {
            const newCanvas = document.createElement('canvas')
            newCanvas.width = img.width
            newCanvas.height = img.height
            const ctx = newCanvas.getContext('2d')
            if (ctx) {
              ctx.imageSmoothingEnabled = true
              ctx.imageSmoothingQuality = 'high'
              ctx.drawImage(img, 0, 0)
              canvas = newCanvas
              resolve()
            } else {
              reject(new Error('Could not get canvas context'))
            }
          }
          img.onerror = reject
        })
      } catch (domError) {
        throw new Error('dom-to-image-more is required. Please install it: npm install dom-to-image-more')
      }
      
      if (!canvas) {
        throw new Error('Failed to create canvas')
      }
      
      // Import jsPDF
      const { jsPDF } = await import('jspdf')
      
      const canvasWidth = (canvas as HTMLCanvasElement).width
      const canvasHeight = (canvas as HTMLCanvasElement).height
      const pdfWidth = 210 // A4 width in mm
      const pdfHeight = 297 // A4 height in mm
      const pxPerMm = canvasWidth / pdfWidth
      const pageHeightPx = Math.floor(pdfHeight * pxPerMm)

      const elementWidth = clonedElement?.offsetWidth || element.offsetWidth || canvasWidth
      const scale = elementWidth > 0 ? canvasWidth / elementWidth : 1

      const rootRect = clonedElement?.getBoundingClientRect()
      const avoidRangesPx = clonedElement
        ? Array.from(clonedElement.querySelectorAll('[data-page-avoid="true"]'))
            .map((el) => {
              const rect = el.getBoundingClientRect()
              const top = rect.top - (rootRect?.top || 0)
              const bottom = rect.bottom - (rootRect?.top || 0)
              return {
                top: Math.max(0, Math.floor(top * scale)),
                bottom: Math.max(0, Math.ceil(bottom * scale)),
              }
            })
            .filter((r) => r.bottom > r.top)
            .sort((a, b) => a.top - b.top)
        : []

      const breakPointsPx = clonedElement
        ? Array.from(clonedElement.querySelectorAll('[data-page-break="true"]'))
            .map((el) => {
              const rect = el.getBoundingClientRect()
              const top = rect.top - (rootRect?.top || 0)
              return Math.max(0, Math.floor(top * scale))
            })
            .sort((a, b) => a - b)
        : []

      const minPageContentPx = Math.max(200, Math.floor(pageHeightPx * 0.3))

      const resolveBreak = (start: number, desiredEnd: number) => {
        let end = desiredEnd
        const forced = breakPointsPx.find((p) => p > start + 1 && p < end - 1)
        if (forced) {
          end = forced
        }

        let guard = 0
        while (guard < 10) {
          const hit = avoidRangesPx.find(
            (r) => r.top < end && r.bottom > end && r.bottom > start + 1
          )
          if (!hit) break
          const elementHeight = hit.bottom - hit.top
          if (elementHeight > pageHeightPx * 0.95) {
            break
          }
          const candidateBefore = hit.top - 1
          if (candidateBefore - start >= minPageContentPx) {
            end = candidateBefore
            break
          }
          const candidateAfter = hit.bottom + 1
          if (candidateAfter - start <= pageHeightPx) {
            end = candidateAfter
            guard += 1
            continue
          }
          break
        }

        return Math.min(end, canvasHeight)
      }

      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
        compress: true,
      })

      let pageIndex = 0
      for (let y = 0; y < canvasHeight; ) {
        const desiredEnd = Math.min(y + pageHeightPx, canvasHeight)
        const end = resolveBreak(y, desiredEnd)
        const sliceHeight = Math.max(1, end - y)
        const pageCanvas = document.createElement('canvas')
        pageCanvas.width = canvasWidth
        pageCanvas.height = sliceHeight
        const pageCtx = pageCanvas.getContext('2d')
        if (!pageCtx) {
          throw new Error('Could not get canvas context for page')
        }
        pageCtx.drawImage(
          canvas as HTMLCanvasElement,
          0,
          y,
          canvasWidth,
          sliceHeight,
          0,
          0,
          canvasWidth,
          sliceHeight
        )
        const imgData = pageCanvas.toDataURL('image/jpeg', 0.95)
        if (pageIndex > 0) {
          pdf.addPage()
        }
        const pageHeightMm = (sliceHeight / canvasWidth) * pdfWidth
        pdf.addImage(imgData, 'JPEG', 0, 0, pdfWidth, pageHeightMm, undefined, 'FAST')
        pageIndex += 1
        y = end
      }

      // Generate filename with current date
      const date = new Date().toLocaleDateString('es-ES', { 
        year: 'numeric', 
        month: '2-digit', 
        day: '2-digit' 
      }).replace(/\//g, '-')
      const filename = `reporte-participantes-${date}.pdf`

      // Download the PDF automatically
      pdf.save(filename)
      
      // Clean up cloned element
      if (clonedElement && clonedElement.parentNode) {
        document.body.removeChild(clonedElement)
        clonedElement = null
      }
    } catch (error) {
      console.error('Error generating PDF:', error)
      console.error('Error details:', {
        message: error instanceof Error ? error.message : String(error),
        stack: error instanceof Error ? error.stack : undefined
      })
      
      // Clean up cloned element if it exists
      if (clonedElement && clonedElement.parentNode) {
        try {
          document.body.removeChild(clonedElement)
        } catch (e) {
          console.warn('Error removing cloned element:', e)
        }
      }
      
      alert(`Error al generar el PDF: ${error instanceof Error ? error.message : 'Error desconocido'}. Por favor, intente nuevamente.`)
    } finally {
      setIsDownloading(false)
    }
  }

  if (isLoading || isLoadingCompanions) {
    return (
      <div className="min-h-screen bg-linear-to-br from-green-50 to-white py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white rounded-xl shadow-lg p-12 text-center">
            <Activity className="w-8 h-8 text-green-600 animate-pulse mx-auto mb-4" />
            <p className="text-gray-600">Cargando reporte...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <>
      <style>{`
        @media print {
          @page {
            size: A4;
            margin: 12mm;
          }
          body {
            margin: 0;
            padding: 0;
          }
          .no-print {
            display: none !important;
          }
          .print-page {
            break-after: page;
            page-break-after: always;
          }
          .print-page:last-child {
            break-after: auto;
            page-break-after: auto;
          }
          .print-page-start {
            break-before: page;
            page-break-before: always;
          }
          .print-avoid-break {
            break-inside: avoid-page;
            page-break-inside: avoid;
          }
          * {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
            color-adjust: exact !important;
          }
        }
      `}</style>
      <div className="min-h-screen bg-linear-to-br from-green-50 to-white py-8 sm:py-12 px-4 sm:px-6 lg:px-8 print:bg-white print:py-4 print:px-2">
        <div className="max-w-7xl mx-auto print:max-w-none">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <FileText className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h1 className="text-3xl sm:text-4xl font-bold text-gray-800">
                  Reporte de Participantes
                </h1>
                <p className="text-gray-600 mt-1">
                  Análisis completo y estadísticas detalladas
                </p>
              </div>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleDownloadPDF}
              disabled={isDownloading}
              className="no-print flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
            >
              <Download className="w-5 h-5" />
              <span>{isDownloading ? 'Generando...' : 'Descargar PDF'}</span>
            </motion.button>
          </div>
        </motion.div>

        {/* Report Content - with ref for PDF generation */}
        <div ref={reportRef}>
          <div className="print-page">

        {/* Key Metrics - Participants */}
        <div className="mb-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <Users className="w-6 h-6 text-green-600" />
            Métricas de Participantes
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-white rounded-xl shadow-lg p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
              <TrendingUp className="w-5 h-5 text-green-600" />
            </div>
            <p className="text-sm text-gray-600 mb-1">Total de Participantes</p>
            <p className="text-3xl font-bold text-gray-800">{count}</p>
            <p className="text-xs text-gray-500 mt-2">Registrados en total</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white rounded-xl shadow-lg p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <CheckCircle2 className="w-6 h-6 text-green-600" />
              </div>
              <Activity className="w-5 h-5 text-green-600" />
            </div>
            <p className="text-sm text-gray-600 mb-1">Participantes Activos</p>
            <p className="text-3xl font-bold text-green-600">{total_active}</p>
            <p className="text-xs text-gray-500 mt-2">{activePercentage}% del total</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-white rounded-xl shadow-lg p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                <XCircle className="w-6 h-6 text-red-600" />
              </div>
              <Activity className="w-5 h-5 text-red-600" />
            </div>
            <p className="text-sm text-gray-600 mb-1">Participantes Inactivos</p>
            <p className="text-3xl font-bold text-red-600">{total_inactive}</p>
            <p className="text-xs text-gray-500 mt-2">{inactivePercentage}% del total</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="bg-white rounded-xl shadow-lg p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-purple-600" />
              </div>
              <Calendar className="w-5 h-5 text-purple-600" />
            </div>
            <p className="text-sm text-gray-600 mb-1">Tasa de Crecimiento</p>
            <p className={`text-3xl font-bold ${parseFloat(growthRate) >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {growthRate}%
            </p>
            <p className="text-xs text-gray-500 mt-2">Últimos 7 días</p>
          </motion.div>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Status Distribution Pie Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="bg-white rounded-xl shadow-lg p-6"
          >
            <div className="flex items-center gap-3 mb-6">
              <PieChart className="w-6 h-6 text-green-600" />
              <h2 className="text-xl font-bold text-gray-800">Distribución de Participantes por Estado</h2>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <RechartsPieChart>
                <Pie
                  data={participantStatusData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }: { name?: string; percent?: number }) => `${name || ''}: ${((percent || 0) * 100).toFixed(0)}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {participantStatusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </RechartsPieChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Registration Trends Area Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="bg-white rounded-xl shadow-lg p-6"
          >
            <div className="flex items-center gap-3 mb-6">
              <BarChart3 className="w-6 h-6 text-blue-600" />
              <h2 className="text-xl font-bold text-gray-800">Tendencias de Registro de Participantes</h2>
            </div>
            {dailyRegistrations.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={dailyRegistrations}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    dataKey="date" 
                    angle={-45}
                    textAnchor="end"
                    height={80}
                    fontSize={12}
                  />
                  <YAxis />
                  <Tooltip />
                  <Area 
                    type="monotone" 
                    dataKey="registrations" 
                    stroke="#10b981" 
                    fill="#10b981"
                    fillOpacity={0.6}
                  />
                </AreaChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-[300px] flex items-center justify-center text-gray-500">
                <p>No hay datos de registro disponibles</p>
              </div>
            )}
          </motion.div>
        </div>

        {/* Companions Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Companion Status Distribution Pie Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
            className="bg-white rounded-xl shadow-lg p-6"
          >
            <div className="flex items-center gap-3 mb-6">
              <PieChart className="w-6 h-6 text-blue-600" />
              <h2 className="text-xl font-bold text-gray-800">Distribución de Acompañantes por Estado</h2>
            </div>
            {totalCompanions > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <RechartsPieChart>
                  <Pie
                    data={companionStatusData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }: { name?: string; percent?: number }) => `${name || ''}: ${((percent || 0) * 100).toFixed(0)}%`}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {companionStatusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </RechartsPieChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-[300px] flex items-center justify-center text-gray-500">
                <p>No hay acompañantes registrados</p>
              </div>
            )}
          </motion.div>

          {/* Companion Registration Trends Area Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="bg-white rounded-xl shadow-lg p-6"
          >
            <div className="flex items-center gap-3 mb-6">
              <BarChart3 className="w-6 h-6 text-purple-600" />
              <h2 className="text-xl font-bold text-gray-800">Tendencias de Registro de Acompañantes</h2>
            </div>
            {dailyCompanionRegistrations.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={dailyCompanionRegistrations}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    dataKey="date" 
                    angle={-45}
                    textAnchor="end"
                    height={80}
                    fontSize={12}
                  />
                  <YAxis />
                  <Tooltip />
                  <Area 
                    type="monotone" 
                    dataKey="registrations" 
                    stroke="#3b82f6" 
                    fill="#3b82f6"
                    fillOpacity={0.6}
                  />
                </AreaChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-[300px] flex items-center justify-center text-gray-500">
                <p>No hay datos de registro disponibles</p>
              </div>
            )}
          </motion.div>
        </div>

        {/* Daily Registrations Bar Chart */}
        {registrationData.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
            className="bg-white rounded-xl shadow-lg p-6 mb-8"
          >
            <div className="flex items-center gap-3 mb-6">
              <BarChart3 className="w-6 h-6 text-green-600" />
              <h2 className="text-xl font-bold text-gray-800">Registros Diarios (Últimos 30 días)</h2>
            </div>
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={registrationData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="date" 
                  angle={-45}
                  textAnchor="end"
                  height={100}
                  fontSize={11}
                />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="count" fill="#10b981" radius={[8, 8, 0, 0]}>
                  {registrationData.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </motion.div>
        )}

        <div data-page-break="true" className="hidden print:block h-0" />

        {/* Summary Statistics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.9 }}
          className="bg-white rounded-xl shadow-lg p-6"
          data-page-avoid="true"
        >
          <h2
            className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2"
            data-page-avoid="true"
          >
            <FileText className="w-6 h-6 text-green-600 mt-16" />
            Resumen Ejecutivo
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="font-semibold text-gray-700 mb-2">Participantes</h3>
              <div className="border-l-4 border-green-500 pl-4">
                <p className="text-sm text-gray-600">Total de Registros</p>
                <p className="text-2xl font-bold text-gray-800">{count}</p>
              </div>
              <div className="border-l-4 border-blue-500 pl-4">
                <p className="text-sm text-gray-600">Tasa de Actividad</p>
                <p className="text-2xl font-bold text-blue-600">{activePercentage}%</p>
              </div>
              <div className="border-l-4 border-purple-500 pl-4">
                <p className="text-sm text-gray-600">Registros en últimos 7 días</p>
                <p className="text-2xl font-bold text-purple-600">{last7Days}</p>
              </div>
              <div className="border-l-4 border-orange-500 pl-4">
                <p className="text-sm text-gray-600">Tasa de Crecimiento</p>
                <p className={`text-2xl font-bold ${parseFloat(growthRate) >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {growthRate}%
                </p>
              </div>
            </div>
            <div className="space-y-4">
              <h3 className="font-semibold text-gray-700 mb-2">Acompañantes</h3>
              <div className="border-l-4 border-blue-500 pl-4">
                <p className="text-sm text-gray-600">Total de Acompañantes</p>
                <p className="text-2xl font-bold text-blue-600">{totalCompanions}</p>
              </div>
              <div className="border-l-4 border-green-500 pl-4">
                <p className="text-sm text-gray-600">Tasa de Actividad</p>
                <p className="text-2xl font-bold text-green-600">{activeCompanionsPercentage}%</p>
              </div>
              <div className="border-l-4 border-purple-500 pl-4">
                <p className="text-sm text-gray-600">Participantes con Acompañantes</p>
                <p className="text-2xl font-bold text-purple-600">{participantsWithCompanions}</p>
              </div>
              <div className="border-l-4 border-orange-500 pl-4">
                <p className="text-sm text-gray-600">Promedio por Participante</p>
                <p className="text-2xl font-bold text-orange-600">{avgCompanionsPerParticipant}</p>
              </div>
            </div>
          </div>
        </motion.div>

        </div>

        <div data-page-break="true" className="hidden print:block h-0" />

        {/* Participants List Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.0 }}
          className="print-page print-page-start bg-white rounded-xl shadow-lg p-6"
        >
          <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <Users className="w-6 h-6 text-green-600" />
            Lista Completa de Participantes
          </h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Nombre Completo
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    DNI
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Teléfono
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Ubicación
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Estado
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {participants.map((participant: Participant, index: number) => (
                  <tr
                    key={participant.id || index}
                    className="hover:bg-gray-50"
                    data-page-avoid="true"
                  >
                    <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">
                      {participant.name} {participant.last_name}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                      {participant.dni}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                      {participant.email}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                      {participant.celphone}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                      {participant.location}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        participant.is_active 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {participant.is_active ? 'O' : 'X'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {participants.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                No hay participantes registrados
              </div>
            )}
          </div>
        </motion.div>
        </div>
        </div>
      </div>
    </>
  )
}

export default ParticipantsReport
