import { Outlet } from 'react-router-dom'
import Header from '../router/Header'
import Footer from '../router/Footer'

export default function Layout() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <main className="grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

