import CongresoAdminMain from '../../components/congreso/admin/CongresoAdminMain'
import AdminSidebar from '../../components/congreso/admin/AdminSidebar'
import AdminNavigator from '../../components/congreso/admin/AdminNavigator'

const CongresoAdminPage = () => {
  return (
    <div className="min-h-screen bg-linear-to-br from-green-50 to-white flex">
      <AdminSidebar />
      <main className="flex-1 overflow-x-hidden pb-16 lg:pb-0">
        <CongresoAdminMain />
      </main>
      <AdminNavigator />
    </div>
  )
}

export default CongresoAdminPage