import { motion } from 'framer-motion'
import { BookOpen, Edit, Trash2, Loader2, AlertCircle, User, Phone } from 'lucide-react'
import type { Tema } from '../../../../services/api/temaService'

interface TemasListProps {
  temas: Tema[]
  isLoading?: boolean
  error?: Error | null
  onEdit: (tema: Tema) => void
  onDelete: (id: number) => void
  deletingTemaId?: number | null
}

const TemasList = ({
  temas,
  isLoading,
  error,
  onEdit,
  onDelete,
  deletingTemaId,
}: TemasListProps) => {
  if (isLoading) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-12 text-center">
        <Loader2 className="w-8 h-8 text-green-600 animate-spin mx-auto mb-4" />
        <p className="text-gray-600">Cargando temas...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-12 text-center">
        <AlertCircle className="w-8 h-8 text-red-600 mx-auto mb-4" />
        <p className="text-red-600 font-semibold mb-2">Error al cargar temas</p>
        <p className="text-gray-600">Por favor, intenta nuevamente más tarde.</p>
      </div>
    )
  }

  if (temas.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-12 text-center">
        <BookOpen className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <p className="text-gray-600 font-semibold mb-2">No hay temas registrados</p>
        <p className="text-gray-500 text-sm">Crea tu primer tema para comenzar</p>
      </div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl shadow-lg overflow-hidden"
    >
      <div className="divide-y divide-gray-200">
        {temas.map((tema: Tema, index: number) => (
          <motion.div
            key={tema.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            className="p-6 hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center shrink-0">
                    <BookOpen className="w-6 h-6 text-green-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-800 mb-2">
                      {tema.title}
                    </h3>
                    <p className="text-gray-600 mb-4">
                      {tema.description}
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <User className="w-4 h-4 text-green-600" />
                        <span className="font-semibold">Coordinador:</span>
                        <span>{tema.coordinator}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Phone className="w-4 h-4 text-green-600" />
                        <span className="font-semibold">Teléfono:</span>
                        <span>{tema.coordinator_celphone}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2 ml-4">
                <button
                  onClick={() => onEdit(tema)}
                  className="p-2 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors"
                  title="Editar tema"
                >
                  <Edit className="w-4 h-4" />
                </button>
                <button
                  onClick={() => onDelete(tema.id)}
                  disabled={deletingTemaId === tema.id}
                  className="p-2 bg-red-50 text-red-700 rounded-lg hover:bg-red-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  title="Eliminar tema"
                >
                  {deletingTemaId === tema.id ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Trash2 className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}

export default TemasList
