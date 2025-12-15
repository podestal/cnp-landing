import { createBrowserRouter } from 'react-router-dom'
import Layout from '../pages/MainPage'
import NotFound from '../components/errors/NotFound'
import Hero from '../components/main/Hero'
import ServicesSection from '../components/main/ServicesSection'
import ComunicadosSection from '../components/main/ComunicadosSection'
import NoticiasSection from '../components/main/NoticiasSection'
import EventosSection from '../components/main/EventosSection'
import LogosSection from '../components/main/LogosSection'
import Nosotros from '../pages/Nosotros'
import Comunicados from '../pages/Comunicados'
import Noticias from '../pages/Noticias'
import InstitucionalLayout from '../pages/institucional/InstitucionalLayout'
import InstitucionalNosotros from '../pages/institucional/InstitucionalNosotros'
import InstitucionalJuntaDirectiva from '../pages/institucional/InstitucionalJuntaDirectiva'
import InstitucionalTribunalHonor from '../pages/institucional/InstitucionalTribunalHonor'
import InstitucionalMisionVision from '../pages/institucional/InstitucionalMisionVision'
import Contacto from '../pages/Contacto'
import Eventos from '../pages/Eventos'
import Servicios from '../pages/Servicios'
import PopupModal from '../components/PopupModal'
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
            <PopupModal />
            <Hero />
            <ServicesSection />
            <ComunicadosSection />
            <NoticiasSection />
            <EventosSection />
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
        element: <Eventos />,
      },
      {
        path: 'eventos/:id',
        element: <Eventos />,
      },
      {
        path: 'comunicados',
        element: <Comunicados />,
      },
      {
        path: 'comunicados/:id',
        element: <Comunicados />,
      },
      {
        path: 'noticias',
        element: <Noticias />,
      },
      {
        path: 'noticias/:id',
        element: <Noticias />,
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
        element: <InstitucionalLayout />,
        children: [
          {
            index: true,
            element: <InstitucionalNosotros />,
          },
          {
            path: 'junta-directiva',
            element: <InstitucionalJuntaDirectiva />,
          },
          {
            path: 'tribunal-de-honor',
            element: <InstitucionalTribunalHonor />,
          },
          {
            path: 'mision-vision',
            element: <InstitucionalMisionVision />,
          },
        ],
      },
      {
        path: 'notarios',
        element: <UnderConstruction pageName="Notarios" />,
      },
      {
        path: 'servicios',
        element: <Servicios />,
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