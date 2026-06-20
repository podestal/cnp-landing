import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Calendar, MapPin, Building, Clock, Phone, Mail, FileText, Download, Hotel, DollarSign, ArrowLeft } from 'lucide-react'

const CongresoInfo = () => {
  return (
    <div className="min-h-screen bg-linear-to-br from-green-50 to-white">
      {/* Banner Section */}
      <div 
        className="relative w-full h-64 sm:h-80 md:h-96 lg:h-112 bg-cover bg-top bg-no-repeat"
        style={{
          backgroundImage: `url('https://pub-298b15d30a4a4c8b8bfd457d07eef0ec.r2.dev/cnp/pop-up/ScreenShot2026-01-10at6.34.16A.jpeg')`
        }}
      >
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/60" />
        
        {/* Content Overlay */}
        <div className="relative z-10 h-full flex items-center justify-center lg:pt-10 pt-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center px-4 sm:px-6"
          >
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 drop-shadow-lg">
              XVIII Congreso Nacional del Notariado Peruano
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-white/90 max-w-4xl mx-auto italic drop-shadow-md">
              "Notariado y jurisdicción voluntaria: Hacia una justicia descongestionada en una época de cambios"
            </p>
          </motion.div>
        </div>
      </div>

      {/* Main Content */}
      <div className="pb-8 sm:pb-12 px-4 sm:px-6 lg:px-8 lg:pt-20 pt-30">
        <div className="max-w-6xl mx-auto -mt-8 sm:-mt-12 md:-mt-16">
          <Link
            to="/eventos"
            className="inline-flex items-center gap-2 text-green-700 hover:text-green-800 mb-6 transition-colors duration-200"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Volver a Eventos</span>
          </Link>
          {/* Event Details Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-white rounded-xl shadow-lg p-6"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <Calendar className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800">Fecha</h3>
            </div>
            <p className="text-gray-600">5 - 7 de Febrero, 2026</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white rounded-xl shadow-lg p-6"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <MapPin className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800">Ubicación</h3>
            </div>
            <p className="text-gray-600">Hotel GHL Gran Hotel Lago Titicaca, Isla Esteves – Puno</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-white rounded-xl shadow-lg p-6"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <Building className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800">Organiza</h3>
            </div>
            <p className="text-gray-600">Colegio de Notarios de Puno</p>
          </motion.div>
        </div>

        {/* Program Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="bg-white rounded-xl shadow-lg p-6 sm:p-8 mb-12"
        >
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6 flex items-center gap-3">
            <Clock className="w-8 h-8 text-green-600" />
            Programa General
          </h2>
          
          <div className="space-y-6">
            {/* Day 1 */}
            <div className="border-l-4 border-green-500 pl-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Jueves 05 de Febrero</h3>
              <div className="space-y-2 text-gray-600">
                <p><span className="font-semibold">13:00 h:</span> Visita al complejo arqueológico de Sillustani</p>
                <p><span className="font-semibold">18:00 h:</span> Conversatorio sobre "Jurisdicción Voluntaria"</p>
                <p><span className="font-semibold">19:00 h:</span> Cóctel de bienvenida</p>
              </div>
            </div>

            {/* Day 2 */}
            <div className="border-l-4 border-green-500 pl-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Viernes 06 de Febrero</h3>
              <div className="space-y-2 text-gray-600">
                <p><span className="font-semibold">8:00 h:</span> Registro de participantes</p>
                <p><span className="font-semibold">8:30 h:</span> Ceremonia de inauguración con programa especial</p>
                <p><span className="font-semibold">9:30 h:</span> Actividad académica</p>
                <p><span className="font-semibold">13:00 h:</span> Almuerzo libre</p>
                <p><span className="font-semibold">15:30 h:</span> Actividad académica</p>
                <p><span className="font-semibold">19:20 h:</span> Cierre de actividades</p>
                <p className="text-sm text-gray-500 italic">*Por la tarde se desarrollará la actividad deportiva</p>
              </div>
            </div>

            {/* Day 3 */}
            <div className="border-l-4 border-green-500 pl-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Sábado 07 de Febrero</h3>
              <div className="space-y-2 text-gray-600">
                <p><span className="font-semibold">9:00 h:</span> Actividad Académica</p>
                <p><span className="font-semibold">9:50 h:</span> Trabajo de comisiones</p>
                <p><span className="font-semibold">10:50 h:</span> Debate y conclusiones</p>
                <p><span className="font-semibold">12:00 h:</span> Clausura</p>
                <p><span className="font-semibold">19:00 h:</span> Cena de gala y show costumbrista</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Thematic Structure */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="bg-white rounded-xl shadow-lg p-6 sm:p-8 mb-12"
        >
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6 flex items-center gap-3">
            <FileText className="w-8 h-8 text-green-600" />
            Estructura Temática
          </h2>
          <div className="space-y-4">
            <div className="bg-green-50 rounded-lg p-4 border-l-4 border-green-500">
              <p className="text-gray-700">
                <span className="font-semibold">I.</span> La administración preventiva de justicia y el ejercicio de la función notarial.
              </p>
            </div>
            <div className="bg-green-50 rounded-lg p-4 border-l-4 border-green-500">
              <p className="text-gray-700">
                <span className="font-semibold">II.</span> Balances en el conocimiento de los asuntos no contenciosos en sede notarial a los 30 años de vigencia de la Ley N° 26662. Perspectivas del Poder Judicial y del Notariado.
              </p>
            </div>
            <div className="bg-green-50 rounded-lg p-4 border-l-4 border-green-500">
              <p className="text-gray-700">
                <span className="font-semibold">III.</span> Nuevas competencias para el Notariado. Propuestas legislativas para ampliación de facultades.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Registration Information */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="bg-white rounded-xl shadow-lg p-6 sm:p-8 mb-12"
        >
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6 flex items-center gap-3">
            <DollarSign className="w-8 h-8 text-green-600" />
            Información de Inscripción
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Inversión</h3>
              <div className="bg-green-50 rounded-lg p-4 mb-4">
                <p className="text-lg font-semibold text-green-700 mb-2">Congresista: S/ 450.00</p>
                <p className="text-sm text-gray-600">(Incluye: cóctel de bienvenida, cena de gala sábado)</p>
              </div>
              
              <h4 className="text-lg font-semibold text-gray-800 mb-3">Formas de Pago</h4>
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="font-semibold text-gray-700 mb-2">CAJA AREQUIPA</p>
                <p className="text-sm text-gray-600 mb-1">CCI: 803-013-000757968007-20</p>
                <p className="text-sm text-gray-600">Cuenta Corriente en soles: 00075796802100007001</p>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Contactos</h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-green-600 shrink-0 mt-1" />
                  <div>
                    <p className="text-sm text-gray-600">notariospuno@gmail.com</p>
                    <p className="text-sm text-gray-600">notariospuno@hotmail.com</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-green-600 shrink-0 mt-1" />
                  <div>
                    <p className="text-sm text-gray-600">Celular: 950 866 610</p>
                    <p className="text-sm text-gray-600">Fijo: 051-364155</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Building className="w-5 h-5 text-green-600 shrink-0 mt-1" />
                  <div>
                    <p className="text-sm font-semibold text-gray-700 mb-1">Sede del Congreso:</p>
                    <p className="text-sm text-gray-600">Hotel GHL Gran Hotel Lago Titicaca</p>
                    <p className="text-sm text-gray-600">(51-51)367780 - 965994569</p>
                    <a 
                      href="https://ghlhoteles.com" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-sm text-green-600 hover:text-green-700 underline"
                    >
                      ghlhoteles.com
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Hotels Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="bg-white rounded-xl shadow-lg p-6 sm:p-8 mb-12"
        >
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6 flex items-center gap-3">
            <Hotel className="w-8 h-8 text-green-600" />
            Información de Hospedaje
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Hoteles en el Centro de Puno</h3>
              <p className="text-sm text-gray-500 mb-4 italic">* Realizar reservaciones con anticipación</p>
              
              <div className="space-y-4">
                {[
                  { name: 'INTIQA HOTEL', address: 'Jr. Tarapaca 272 Puno, Puno', phone: '963 783 700', url: 'https://intiqahotel.com/' },
                  { name: 'CASONA PLAZA HOTEL, PUNO', address: 'Jirón Puno 280 – Puno', phone: '+51 951751814/ 365614', url: 'https://www.casonaplazahoteles.com/casona-plaza-hotel-puno/' },
                  { name: 'HOTEL HACIENDA PLAZA DE ARMAS – PUNO', address: 'Jr. Puno 419, Puno 21001', phone: '(051) 367340', url: 'https://www.hhp.com.pe/hotel-hacienda-plaza-armas-puno/?sjrncid=GA_23162602766&sjrnaid=GA_780065181777&gclsrc=aw.ds&gad_source=1&gad_campaignid=23162602766&gbraid=0AAAAAC5e-J4SFSAXcEaCc0lze9ty250KQ&gclid=CjwKCAiA86_JBhAIEiwA4i9Ju6TvrhyJ9Z23_QlDgTeW_GXpAoKDpeoPEwgXer32ppx9UIcW4ETBXhoC4pUQAvD_BwE#' },
                  { name: 'HOSTEL SILLUSTANI INN PUNO', address: 'Jr. Tarapaca Nro 305, Puno 21001', phone: '989 924 709', url: 'https://sillustanihostel.com/' },
                  { name: 'HOTEL PUNO TERRA', address: 'Cajamarca 247, Puno 21001', phone: '(051) 363324', url: 'https://terra.puno-hotels.net/es/' },
                  { name: 'HOTEL QALASAYA', address: 'Grau 240, Puno 21001', phone: '951 303 312', url: 'https://qalasaya.puno-hotels.net/es/' },
                  { name: 'SUMAQ PUNO', address: 'Cajamarca 554, Puno 21001', phone: '946 194 005', url: 'https://sumaqpuno.com/' },
                ].map((hotel, index) => (
                  <div key={index} className="bg-blue-50 rounded-lg p-4 border-l-4 border-blue-500 hover:shadow-md transition-shadow">
                    <a
                      href={hotel.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block group"
                    >
                      <p className="font-semibold text-gray-800 mb-1 group-hover:text-blue-700 transition-colors">{hotel.name}</p>
                      <p className="text-sm text-gray-600 mb-1">{hotel.address}</p>
                      <p className="text-sm text-gray-600 mb-2">Tel: {hotel.phone}</p>
                      <span className="text-sm text-blue-600 font-medium group-hover:text-blue-700 underline">
                        Visitar sitio web →
                      </span>
                    </a>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Hoteles cerca del Hotel del Evento</h3>
              <p className="text-sm text-gray-500 mb-4 italic">* Realizar reservaciones con anticipación</p>
              
              <div className="space-y-4">
                {[
                  { name: 'XIMA PUNO HOTEL', address: 'Av. Uros Chulluni 195, Puno.', phone: '(051) 365525', url: 'https://ximahotels.com/' },
                  { name: 'CASA ANDINA PREMIUM PUNO', address: 'Sesquicentenario 1970, Puno.', phone: '(051) 363992/ 951751422', url: 'https://www.casa-andina.com/es/destinos/puno/hoteles/casa-andina-premium-puno' },
                  { name: 'SONESTA POSADAS DEL INCA, PUNO', address: 'Sesquicentenario 610, Puno.', phone: '(051) 364113', url: 'https://www.sonestapipuno.com/?partner=7872&gad_source=1&gad_campaignid=22557536567&gbraid=0AAAAACsvn9TmCl7IJmB_0rzJ4ghQrxOqh&gclid=CjwKCAiA86_JBhAIEiwA4i9Ju_Cq1XbmYxD6nByfbEsVhp_vhKm5vkkmnlYeGr11pyXnpj6dc3S7nxoC01oQAvD_BwE' },
                ].map((hotel, index) => (
                  <div key={index} className="bg-green-50 rounded-lg p-4 border-l-4 border-green-500 hover:shadow-md transition-shadow">
                    <a
                      href={hotel.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block group"
                    >
                      <p className="font-semibold text-gray-800 mb-1 group-hover:text-green-700 transition-colors">{hotel.name}</p>
                      <p className="text-sm text-gray-600 mb-1">{hotel.address}</p>
                      <p className="text-sm text-gray-600 mb-2">Tel: {hotel.phone}</p>
                      <span className="text-sm text-green-600 font-medium group-hover:text-green-700 underline">
                        Visitar sitio web →
                      </span>
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

          {/* Download Brochure */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="text-center"
          >
            <a
              href="https://pub-298b15d30a4a4c8b8bfd457d07eef0ec.r2.dev/cnp/pop-up/BROCHURE%20OFICIAL%20CONGRESO.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-6 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors duration-200 shadow-md hover:shadow-lg"
            >
              <Download className="w-5 h-5" />
              Descargar Brochure Oficial
            </a>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default CongresoInfo
