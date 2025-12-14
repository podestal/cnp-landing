import { createBrowserRouter } from 'react-router-dom'
import Layout from '../pages/MainPage'
import NotFound from '../components/errors/NotFound'
import Hero from '../components/main/Hero'
import ServicesSection from '../components/main/ServicesSection'
import ComunicadosSection from '../components/main/ComunicadosSection'
import NoticiasSection from '../components/main/NoticiasSection'
import LogosSection from '../components/main/LogosSection'
import Nosotros from '../pages/Nosotros'
import Comunicados from '../pages/Comunicados'
import Institucional from '../pages/Institucional'
import Contacto from '../pages/Contacto'
import UnderConstruction from '../components/UnderConstruction'

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
        element: <Nosotros />,
      },
      {
        path: 'eventos',
        element: <UnderConstruction pageName="Eventos" />,
      },
      {
        path: 'comunicados',
        element: <Comunicados />,
      },
      {
        path: 'noticias',
        element: <UnderConstruction pageName="Noticias" />,
      },
      {
        path: 'video',
        element: <UnderConstruction pageName="Video" />,
      },
      {
        path: 'legislacion',
        element: <UnderConstruction pageName="Legislación" />,
      },
      {
        path: 'contacto',
        element: <Contacto />,
      },
      {
        path: 'institucional',
        element: <Institucional />,
      },
      {
        path: 'notarios',
        element: <UnderConstruction pageName="Notarios" />,
      },
      {
        path: 'servicios',
        element: <UnderConstruction pageName="Servicios" />,
      },
      {
        path: 'herramientas',
        element: <UnderConstruction pageName="Herramientas Tecnológicas" />,
      },
    ],
  },
  {
    path: '*',
    element: <NotFound />,
  },
])

export default router