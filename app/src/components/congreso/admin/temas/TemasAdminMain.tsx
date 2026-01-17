import { useState } from 'react'
import { motion } from 'framer-motion'
import { BookOpen, Plus } from 'lucide-react'
import { useGetTemas } from '../../../../hooks/api/tema/useGetTemas'
import { useCreateTema } from '../../../../hooks/api/tema/useCreateTema'
import { useUpdateTema } from '../../../../hooks/api/tema/useUpdateTema'
import { useDeleteTema } from '../../../../hooks/api/tema/useDeleteTema'
import { useNotificationStore } from '../../../../utils/notificationStore'
import type { Tema } from '../../../../services/api/temaService'
import TemasList from './TemasList'
import TemaFormModal from './TemaFormModal'

const TemasAdminMain = () => {
  const { data: temas, isLoading, error } = useGetTemas()
  const createTema = useCreateTema()
  const updateTema = useUpdateTema()
  const deleteTema = useDeleteTema()
  const addNotification = useNotificationStore((state: ReturnType<typeof useNotificationStore.getState>) => state.addNotification)
  
  const [isFormModalOpen, setIsFormModalOpen] = useState(false)
  const [editingTema, setEditingTema] = useState<Tema | null>(null)

  const handleCreate = () => {
    setEditingTema(null)
    setIsFormModalOpen(true)
  }

  const handleEdit = (tema: Tema) => {
    setEditingTema(tema)
    setIsFormModalOpen(true)
  }

  const handleDelete = async (id: number) => {
    if (!window.confirm('¿Estás seguro de que deseas eliminar este tema?')) {
      return
    }

    try {
      await deleteTema.mutateAsync(id)
      addNotification({
        type: 'success',
        message: 'Tema eliminado exitosamente',
      })
    } catch (error) {
      console.error('Error deleting tema:', error)
      addNotification({
        type: 'error',
        message: 'Error al eliminar el tema. Por favor, intenta nuevamente.',
      })
    }
  }

  const handleFormSubmit = async (data: {
    title: string
    description: string
    coordinator: string
    coordinator_celphone: string
  }) => {
    try {
      if (editingTema) {
        await updateTema.mutateAsync({
          id: editingTema.id,
          data,
        })
        addNotification({
          type: 'success',
          message: 'Tema actualizado exitosamente',
        })
      } else {
        await createTema.mutateAsync(data)
        addNotification({
          type: 'success',
          message: 'Tema creado exitosamente',
        })
      }
      setIsFormModalOpen(false)
      setEditingTema(null)
    } catch (error) {
      console.error('Error saving tema:', error)
      addNotification({
        type: 'error',
        message: editingTema
          ? 'Error al actualizar el tema. Por favor, intenta nuevamente.'
          : 'Error al crear el tema. Por favor, intenta nuevamente.',
      })
    }
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-green-50 to-white py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <h1 className="text-3xl sm:text-4xl font-bold text-gray-800">
                  Gestión de Temas
                </h1>
                <p className="text-gray-600 mt-1">
                  Administra los temas del congreso
                </p>
              </div>
            </div>
            <button
              onClick={handleCreate}
              className="px-4 py-2 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors duration-200 flex items-center gap-2"
            >
              <Plus className="w-5 h-5" />
              Nuevo Tema
            </button>
          </div>
        </motion.div>

        {/* Temas List */}
        <TemasList
          temas={temas || []}
          isLoading={isLoading}
          error={error}
          onEdit={handleEdit}
          onDelete={handleDelete}
          deletingTemaId={deleteTema.isPending ? (deleteTema.variables || null) : null}
        />

        {/* Form Modal */}
        <TemaFormModal
          isOpen={isFormModalOpen}
          onClose={() => {
            setIsFormModalOpen(false)
            setEditingTema(null)
          }}
          onSubmit={handleFormSubmit}
          tema={editingTema}
          isSubmitting={createTema.isPending || updateTema.isPending}
        />
      </div>
    </div>
  )
}

export default TemasAdminMain
