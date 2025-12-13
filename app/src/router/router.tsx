import { createBrowserRouter } from 'react-router-dom'
import Layout from '../pages/MainPage'
import NotFound from '../components/errors/NotFound'
import Hero from '../components/main/Hero'
import ServicesSection from '../components/main/ServicesSection'
import ComunicadosSection from '../components/main/ComunicadosSection'
import NoticiasSection from '../components/main/NoticiasSection'
import LogosSection from '../components/main/LogosSection'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: (
          <>
            <Hero />
            <ServicesSection />
            <ComunicadosSection />
            <NoticiasSection />
            <LogosSection />
          </>
        ),
      },
      {
        path: 'nosotros',
        element: <div className="py-12"><h1 className="text-3xl font-bold">Nosotros</h1></div>,
      },
      {
        path: 'eventos',
        element: <div className="py-12"><h1 className="text-3xl font-bold">Eventos</h1></div>,
      },
      {
        path: 'comunicados',
        element: <div className="py-12"><h1 className="text-3xl font-bold">Comunicados</h1></div>,
      },
      {
        path: 'noticias',
        element: <div className="py-12"><h1 className="text-3xl font-bold">Noticias</h1></div>,
      },
      {
        path: 'video',
        element: <div className="py-12"><h1 className="text-3xl font-bold">Video</h1></div>,
      },
      {
        path: 'legislacion',
        element: <div className="py-12"><h1 className="text-3xl font-bold">Legislación</h1></div>,
      },
      {
        path: 'contacto',
        element: <div className="py-12"><h1 className="text-3xl font-bold">Contacto</h1></div>,
      },
      {
        path: 'notarios',
        element: <div className="py-12"><h1 className="text-3xl font-bold">Notarios</h1></div>,
      },
      {
        path: 'servicios',
        element: <div className="py-12"><h1 className="text-3xl font-bold">Servicios</h1></div>,
      },
      {
        path: 'herramientas',
        element: <div className="py-12"><h1 className="text-3xl font-bold">Herramientas Tecnológicas</h1></div>,
      },
    ],
  },
  {
    path: '*',
    element: <NotFound />,
  },
])

export default router