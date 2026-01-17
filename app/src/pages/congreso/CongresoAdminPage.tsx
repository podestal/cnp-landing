import CongresoAdminMain from '../../components/congreso/admin/CongresoAdminMain'
import AdminSidebar from '../../components/congreso/admin/AdminSidebar'

const CongresoAdminPage = () => {
  return (
    <div className="min-h-screen bg-linear-to-br from-green-50 to-white flex">
      <AdminSidebar />
      <main className="flex-1 overflow-x-hidden">
        <CongresoAdminMain />
      </main>
    </div>
  )
}

export default CongresoAdminPage