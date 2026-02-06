import { createBrowserRouter } from 'react-router-dom'
// import ServiceUnavailable from '../pages/ServiceUnavailable'

// All original routes are commented out - only showing ServiceUnavailable page
import { lazy, Suspense } from 'react'
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
import UnderConstruction from '../components/UnderConstruction'

// Lazy load PopupModal for better performance
const PopupModal = lazy(() => import('../components/PopupModal'))
import CongresoLayout from '../pages/congreso/CongresoLayout'
import CongresoPage from '../pages/congreso/CongresoPage'
import CongresoConfirmationPage from '../pages/congreso/CongresoConfirmationPage'
import CompanionForm from '../components/congreso/CompanionForm'
import CongresoInfo from '../pages/CongresoInfo'
import CongresoAdminPage from '../pages/congreso/CongresoAdminPage'
import TemasAdminPage from '../pages/congreso/TemasAdminPage'
import ActividadesAdminPage from '../pages/congreso/ActividadesAdminPage'
import RegisterParticipantPage from '../pages/congreso/RegisterParticipantPage'
import LoginPage from '../pages/auth/LoginPage'
import PrivateRoute from '../components/auth/PrivateRoute'

const router = createBrowserRouter([
  // {
  //   path: '*',
  //   element: <ServiceUnavailable />,
  // },
  // Original routes commented out:
  {
    path: '/',
    element: <Layout />,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: (
          <>
            <Suspense fallback={null}>
              <PopupModal />
            </Suspense>
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
      {
        path: 'congreso',
        element: <CongresoInfo />,
      },
    ],
  },
  {
    path: 'congreso2026',
    element: <CongresoLayout />,
    children: [
      {
        index: true,
        element: <CongresoPage />,
      },
      {
        path: 'acompanantes',
        element: <CompanionForm />,
      },
      {
        path: 'confirmacion',
        element: <CongresoConfirmationPage />,
      },
      {
        path: 'admin',
        element: (
          <PrivateRoute>
            <CongresoAdminPage />
          </PrivateRoute>
        ),
      },
      {
        path: 'temas',
        element: (
          <PrivateRoute>
            <TemasAdminPage />
          </PrivateRoute>
        ),
      },
      {
        path: 'actividades',
        element: (
          <PrivateRoute>
            <ActividadesAdminPage />
          </PrivateRoute>
        ),
      },
      {
        path: 'registrar-participante',
        element: (
          <PrivateRoute>
            <RegisterParticipantPage />
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: 'login',
    element: <LoginPage />,
  },
  {
    path: '*',
    element: <NotFound />,
  },
])

export default router