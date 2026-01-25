import AdminSidebar from '../../components/congreso/admin/AdminSidebar'
import AdminNavigator from '../../components/congreso/admin/AdminNavigator'

const ActividadesAdminPage = () => {
  return (
    <div className="min-h-screen bg-linear-to-br from-green-50 to-white flex">
      <AdminSidebar />
      <main className="flex-1 overflow-x-hidden pb-16 lg:pb-0">
        <div className="p-4 lg:p-8">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4">
              Actividades
            </h1>
            <p className="text-gray-600">
              Página de actividades (próximamente)
            </p>
          </div>
        </div>
      </main>
      <AdminNavigator />
    </div>
  )
}

export default ActividadesAdminPage
