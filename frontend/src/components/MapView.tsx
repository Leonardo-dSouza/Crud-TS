import React, { useState, useEffect } from "react"
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet"
import { Icon, divIcon } from "leaflet"
import {MapPin, Globe, Thermometer, Cloud, Wind, Droplets, Eye, Navigation} from 'lucide-react'
import "leaflet/dist/leaflet.css"
import { fetchCities, fetchCountries, fetchContinents } from "../lib/api"

// Definir interface para dados de cidade
interface City {
  id: string
  nome: string
  populacao: number
  latitude: number
  longitude: number
  idPais: string
  paisNome?: string
  continenteNome?: string
}

// Fix para ícones do Leaflet
const customIcon = new Icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
})

// Componente para ajustar zoom e centralizar no mapa
function MapController({ center, zoom }: { center: [number, number]; zoom: number }) {
  const map = useMap()
  
  useEffect(() => {
    map.setView(center, zoom)
  }, [center, zoom, map])
  
  return null
}

function MapView() {
  const [cities, setCities] = useState<City[]>([])
  const [loadingCities, setLoadingCities] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  const [selectedCity, setSelectedCity] = useState<City | null>(null)
  const [mapCenter, setMapCenter] = useState<[number, number]>([20, 0])
  const [mapZoom, setMapZoom] = useState(2)
  const [searchTerm, setSearchTerm] = useState("")
  const [weather, setWeather] = useState<any>(null)
  const [loadingWeather, setLoadingWeather] = useState(false)

  // Filtrar cidades pela busca
  const filteredCities = cities.filter(city =>
    city.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
    city.paisNome?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    city.continenteNome?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  // Simular carregamento de dados climáticos
  const fetchWeatherData = (city: City) => {
    setLoadingWeather(true)
    // Simulação de API call
    setTimeout(() => {
      setWeather({
        temp: Math.floor(Math.random() * 30) + 10,
        description: ["Ensolarado", "Nublado", "Chuvoso", "Parcialmente nublado"][Math.floor(Math.random() * 4)],
        humidity: Math.floor(Math.random() * 40) + 40,
        windSpeed: Math.floor(Math.random() * 20) + 5,
        visibility: Math.floor(Math.random() * 5) + 5,
        pressure: Math.floor(Math.random() * 50) + 1000
      })
      setLoadingWeather(false)
    }, 800)
  }

  // Carregar cidades, países e continentes do backend e montar nomes relacionados
  useEffect(() => {
    let mounted = true
    ;(async () => {
      setLoadingCities(true)
      setError(null)
      try {
        const [apiCities, apiCountries, apiContinents] = await Promise.all([
          fetchCities(),
          fetchCountries(),
          fetchContinents(),
        ])

        if (!mounted) return

        // montar mapas para lookup
        const countryById: Record<string, any> = {}
        for (const c of apiCountries) {
          countryById[c.id] = c
        }

        const continentById: Record<string, any> = {}
        for (const c of apiContinents) {
          continentById[c.id] = c
        }

        const enriched: City[] = apiCities.map((c: any) => {
          const pais = countryById[String(c.idPais)]
          const continente = pais ? continentById[String(pais.idContinente)] : undefined
          return {
            id: String(c.id),
            nome: c.nome,
            populacao: Number(c.populacao) || 0,
            latitude: Number(c.latitude) || 0,
            longitude: Number(c.longitude) || 0,
            idPais: String(c.idPais),
            paisNome: pais ? pais.nome : undefined,
            continenteNome: continente ? continente.nome : undefined,
          }
        })

        setCities(enriched)
      } catch (err: any) {
        console.error('Erro ao carregar dados do mapa', err)
        setError(err?.message || 'Erro ao carregar dados')
      } finally {
        setLoadingCities(false)
      }
    })()
    return () => {
      mounted = false
    }
  }, [])

  // Centralizar mapa em uma cidade
  const focusOnCity = (city: City) => {
    setSelectedCity(city)
    setMapCenter([city.latitude, city.longitude])
    setMapZoom(10)
    fetchWeatherData(city)
  }

  // Resetar visão do mapa
  const resetMapView = () => {
    setSelectedCity(null)
    setMapCenter([20, 0])
    setMapZoom(2)
    setWeather(null)
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Sidebar - Lista de Cidades */}
      <div className="lg:col-span-1 space-y-4">
        {/* Header com busca */}
        <div className="bg-white rounded-xl p-6 shadow-md border border-slate-200">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
              <Globe className="w-6 h-6 text-sky-500" />
              Cidades no Mapa
            </h2>
            <span className="text-sm font-medium text-slate-500 bg-slate-100 px-3 py-1 rounded-full">
              {filteredCities.length} cidades
            </span>
          </div>
          
          {/* Busca */}
          <div className="relative">
            <input
              type="text"
              placeholder="Buscar cidade, país ou continente..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent"
            />
            <MapPin className="absolute left-3 top-2.5 w-5 h-5 text-slate-400" />
          </div>

          {/* Botão Reset View */}
          {selectedCity && (
            <button
              onClick={resetMapView}
              className="mt-4 w-full flex items-center justify-center gap-2 px-4 py-2 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition-colors"
            >
              <Navigation className="w-4 h-4" />
              Voltar à Visão Global
            </button>
          )}
        </div>

        {/* Lista de Cidades */}
        <div className="bg-white rounded-xl shadow-md border border-slate-200 max-h-[600px] overflow-y-auto">
          {filteredCities.length === 0 ? (
            <div className="p-8 text-center text-slate-500">
              <MapPin className="w-12 h-12 mx-auto mb-3 text-slate-300" />
              <p>Nenhuma cidade encontrada</p>
            </div>
          ) : (
            <div className="divide-y divide-slate-200">
              {filteredCities.map((city) => (
                <button
                  key={city.id}
                  onClick={() => focusOnCity(city)}
                  className={`w-full text-left p-4 hover:bg-sky-50 transition-all duration-200 ${
                    selectedCity?.id === city.id ? "bg-sky-50 border-l-4 border-sky-500" : ""
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="font-semibold text-slate-800 mb-1">{city.nome}</h3>
                      <div className="space-y-1">
                        <p className="text-sm text-slate-600 flex items-center gap-1">
                          <Globe className="w-3 h-3" />
                          {city.paisNome} • {city.continenteNome}
                        </p>
                        <p className="text-xs text-slate-500">
                          Pop: {city.populacao.toLocaleString("pt-BR")}
                        </p>
                        <p className="text-xs text-slate-400">
                          📍 {city.latitude.toFixed(4)}°, {city.longitude.toFixed(4)}°
                        </p>
                      </div>
                    </div>
                    <MapPin className={`w-5 h-5 ${selectedCity?.id === city.id ? "text-sky-500" : "text-slate-400"}`} />
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Mapa Principal */}
      <div className="lg:col-span-2 space-y-4">
        {/* Informações da Cidade Selecionada */}
        {selectedCity && (
          <div className="bg-gradient-to-r from-sky-500 to-blue-600 rounded-xl p-6 text-white shadow-xl">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h2 className="text-2xl font-bold mb-1">{selectedCity.nome}</h2>
                <p className="text-sky-100">{selectedCity.paisNome} • {selectedCity.continenteNome}</p>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2">
                <p className="text-xs text-sky-100">População</p>
                <p className="text-lg font-bold">{(selectedCity.populacao / 1000000).toFixed(2)}M</p>
              </div>
            </div>

            {/* Dados Climáticos */}
            {weather && !loadingWeather && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4 pt-4 border-t border-sky-400/30">
                <div className="flex items-center gap-2">
                  <Thermometer className="w-5 h-5" />
                  <div>
                    <p className="text-xs text-sky-100">Temperatura</p>
                    <p className="font-semibold">{weather.temp}°C</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Cloud className="w-5 h-5" />
                  <div>
                    <p className="text-xs text-sky-100">Condição</p>
                    <p className="font-semibold text-sm">{weather.description}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Droplets className="w-5 h-5" />
                  <div>
                    <p className="text-xs text-sky-100">Umidade</p>
                    <p className="font-semibold">{weather.humidity}%</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Wind className="w-5 h-5" />
                  <div>
                    <p className="text-xs text-sky-100">Vento</p>
                    <p className="font-semibold">{weather.windSpeed} km/h</p>
                  </div>
                </div>
              </div>
            )}

            {loadingWeather && (
              <div className="mt-4 pt-4 border-t border-sky-400/30 flex items-center justify-center gap-2 text-sky-100">
                <Cloud className="w-5 h-5 animate-pulse" />
                <span>Carregando dados climáticos...</span>
              </div>
            )}
          </div>
        )}

        {/* Container do Mapa */}
        <div className="bg-white rounded-xl shadow-md border border-slate-200 overflow-hidden">
          <div className="h-[600px] w-full relative">
            <MapContainer
              center={mapCenter}
              zoom={mapZoom}
              style={{ height: "100%", width: "100%" }}
              scrollWheelZoom={true}
            >
              <MapController center={mapCenter} zoom={mapZoom} />
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              {filteredCities.map((city) => (
                <Marker
                  key={city.id}
                  position={[city.latitude, city.longitude]}
                  icon={customIcon}
                  eventHandlers={{
                    click: () => focusOnCity(city),
                  }}
                >
                  <Popup>
                    <div className="p-2 min-w-[200px]">
                      <h3 className="font-bold text-slate-800 mb-2">{city.nome}</h3>
                      <div className="space-y-1 text-sm">
                        <p className="text-slate-600">🌍 {city.paisNome}</p>
                        <p className="text-slate-600">🗺️ {city.continenteNome}</p>
                        <p className="text-slate-600">👥 {city.populacao.toLocaleString("pt-BR")}</p>
                        <p className="text-slate-500 text-xs mt-2">
                          📍 {city.latitude.toFixed(4)}°, {city.longitude.toFixed(4)}°
                        </p>
                      </div>
                      <button
                        onClick={() => focusOnCity(city)}
                        className="mt-3 w-full px-3 py-1.5 bg-sky-500 text-white text-sm rounded hover:bg-sky-600 transition-colors"
                      >
                        Ver Detalhes
                      </button>
                    </div>
                  </Popup>
                </Marker>
              ))}
            </MapContainer>

            {/* Legenda do Mapa */}
            <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-sm rounded-lg shadow-lg p-3 z-[1000]">
              <p className="text-xs font-semibold text-slate-700 mb-2">Legenda</p>
              <div className="flex items-center gap-2 text-xs text-slate-600">
                <div className="w-3 h-3 bg-sky-500 rounded-full"></div>
                <span>Cidades cadastradas ({filteredCities.length})</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MapView
