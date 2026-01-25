import { useState } from 'react'
import { motion } from 'framer-motion'
import { QrCode, Settings } from 'lucide-react'
import AdminNavigator from '../AdminNavigator'
import AdminSidebar from '../AdminSidebar'
import ActivityScanTab from './ActivityScanTab'
import ActivityManageTab from './ActivityManageTab'

const ActivitiesMain = () => {
  const [activeTab, setActiveTab] = useState<'scan' | 'manage'>('scan')

  return (
    <div className="min-h-screen bg-linear-to-br from-green-50 to-white flex">
      <AdminSidebar />
      <main className="flex-1 overflow-x-hidden pb-16 lg:pb-0">
        <div className="p-4 lg:p-8">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8"
            >
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-2">
                Actividades
              </h1>
              <p className="text-gray-600">
                Escanea códigos QR para registrar participantes en actividades
              </p>
            </motion.div>

            {/* Tabs */}
            <div className="mb-6">
              <div className="flex gap-2 border-b border-gray-200">
                <button
                  onClick={() => setActiveTab('scan')}
                  className={`
                    px-6 py-3 font-semibold text-sm transition-all duration-200
                    border-b-2 relative
                    ${
                      activeTab === 'scan'
                        ? 'text-green-600 border-green-600'
                        : 'text-gray-500 border-transparent hover:text-gray-700'
                    }
                  `}
                >
                  <div className="flex items-center gap-2">
                    <QrCode className="w-5 h-5" />
                    <span>Escanear</span>
                  </div>
                </button>
                <button
                  onClick={() => setActiveTab('manage')}
                  className={`
                    px-6 py-3 font-semibold text-sm transition-all duration-200
                    border-b-2 relative
                    ${
                      activeTab === 'manage'
                        ? 'text-green-600 border-green-600'
                        : 'text-gray-500 border-transparent hover:text-gray-700'
                    }
                  `}
                >
                  <div className="flex items-center gap-2">
                    <Settings className="w-5 h-5" />
                    <span>Gestionar</span>
                  </div>
                </button>
              </div>
            </div>

            {/* Tab Content */}
            <div className="mt-6">
              {activeTab === 'scan' && <ActivityScanTab />}
              {activeTab === 'manage' && <ActivityManageTab />}
            </div>
          </div>
        </div>
      </main>
      <AdminNavigator />
    </div>
  )
}

export default ActivitiesMain