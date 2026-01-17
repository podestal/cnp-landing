import TemasAdminMain from '../../components/congreso/admin/temas/TemasAdminMain'
import AdminSidebar from '../../components/congreso/admin/AdminSidebar'

const TemasAdminPage = () => {
  return (
    <div className="min-h-screen bg-linear-to-br from-green-50 to-white flex">
      <AdminSidebar />
      <main className="flex-1 overflow-x-hidden">
        <TemasAdminMain />
      </main>
    </div>
  )
}

export default TemasAdminPage
