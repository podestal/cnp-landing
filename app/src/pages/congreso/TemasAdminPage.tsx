import TemasAdminMain from '../../components/congreso/admin/temas/TemasAdminMain'
import AdminSidebar from '../../components/congreso/admin/AdminSidebar'
import AdminNavigator from '../../components/congreso/admin/AdminNavigator'

const TemasAdminPage = () => {
  return (
    <div className="min-h-screen bg-linear-to-br from-green-50 to-white flex">
      <AdminSidebar />
      <main className="flex-1 overflow-x-hidden pb-16 lg:pb-0">
        <TemasAdminMain />
      </main>
      <AdminNavigator />
    </div>
  )
}

export default TemasAdminPage
