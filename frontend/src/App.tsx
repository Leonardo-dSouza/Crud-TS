import React, { useState } from "react"
import {Globe, MapPin, Flag, Home, Sun, CloudRain, Map} from 'lucide-react'
import Dashboard from "./components/Dashboard"
import ContinentManager from "./components/ContinentManager"
import CountryManager from "./components/CountryManager"
import CityManager from "./components/CityManager"
import MapView from "./components/MapView"

type TabType = "dashboard" | "continents" | "countries" | "cities" | "map"

function App() {
  const [activeTab, setActiveTab] = useState<TabType>("dashboard")

  const tabs = [
    { id: "dashboard" as TabType, label: "Dashboard", icon: Home },
    { id: "continents" as TabType, label: "Continentes", icon: Globe },
    { id: "countries" as TabType, label: "Países", icon: Flag },
    { id: "cities" as TabType, label: "Cidades", icon: MapPin },
    { id: "map" as TabType, label: "Mapa Mundial", icon: Map },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <header className="bg-white shadow-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="relative">
                <Globe className="w-8 h-8 text-sky-500" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full animate-pulse" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-slate-800">GeoWiki</h1>
                <p className="text-xs text-slate-500">Enciclopédia Geográfica Interativa</p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-sm text-slate-600">
              <Sun className="w-4 h-4 text-yellow-500" />
              <span>Online</span>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <nav className="bg-white shadow-sm border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-1 overflow-x-auto">
            {tabs.map((tab) => {
              const Icon = tab.icon
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-6 py-3 text-sm font-medium transition-all duration-200 border-b-2 whitespace-nowrap ${
                    activeTab === tab.id
                      ? "text-sky-600 border-sky-600 bg-sky-50"
                      : "text-slate-600 border-transparent hover:text-slate-900 hover:bg-slate-50"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {tab.label}
                </button>
              )
            })}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="animate-fadeIn">
          {activeTab === "dashboard" && <Dashboard />}
          {activeTab === "continents" && <ContinentManager />}
          {activeTab === "countries" && <CountryManager />}
          {activeTab === "cities" && <CityManager />}
          {activeTab === "map" && <MapView />}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-slate-600">
            <p>© 2025 GeoWiki - Enciclopédia Geográfica Interativa</p>
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-2">
                <CloudRain className="w-4 h-4 text-sky-500" />
                OpenWeatherMap
              </span>
              <span className="flex items-center gap-2">
                <Flag className="w-4 h-4 text-green-500" />
                REST Countries
              </span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
