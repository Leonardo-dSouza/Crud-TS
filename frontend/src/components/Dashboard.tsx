import React, { useEffect, useState } from "react"
import {Globe, Flag, MapPin, TrendingUp, Map, Cloud} from 'lucide-react'

interface Stats {
  continents: number
  countries: number
  cities: number
  totalPopulation: number
}

function Dashboard() {
  const [stats, setStats] = useState<Stats>({
    continents: 0,
    countries: 0,
    cities: 0,
    totalPopulation: 0,
  })
  const [weather, setWeather] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simular carregamento de estatísticas
    setTimeout(() => {
      setStats({
        continents: 6,
        countries: 195,
        cities: 4234,
        totalPopulation: 7953000000,
      })
      setLoading(false)
    }, 500)
  }, [])

  const statsCards = [
    {
      title: "Continentes",
      value: stats.continents,
      icon: Globe,
      color: "bg-green-500",
      bgColor: "bg-green-50",
      textColor: "text-green-600",
    },
    {
      title: "Países",
      value: stats.countries,
      icon: Flag,
      color: "bg-sky-500",
      bgColor: "bg-sky-50",
      textColor: "text-sky-600",
    },
    {
      title: "Cidades",
      value: stats.cities,
      icon: MapPin,
      color: "bg-orange-500",
      bgColor: "bg-orange-50",
      textColor: "text-orange-600",
    },
    {
      title: "População Total",
      value: stats.totalPopulation.toLocaleString("pt-BR"),
      icon: TrendingUp,
      color: "bg-purple-500",
      bgColor: "bg-purple-50",
      textColor: "text-purple-600",
    },
  ]

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-sky-500 to-blue-600 rounded-2xl p-8 text-white shadow-xl">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-3xl font-bold mb-2">Bem-vindo ao GeoWiki</h2>
            <p className="text-sky-100 max-w-2xl">
              Enciclopédia geográfica interativa completa. Explore continentes, países e cidades com visualização em mapa e integração em tempo real de APIs externas.
            </p>
          </div>
          <Map className="w-20 h-20 opacity-20" />
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsCards.map((stat, index) => {
          const Icon = stat.icon
          return (
            <div
              key={index}
              className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300 border border-slate-200 hover:scale-105"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <p className="text-sm font-medium text-slate-600 mb-1">{stat.title}</p>
                  <p className={`text-2xl font-bold ${stat.textColor}`}>
                    {loading ? "..." : stat.value}
                  </p>
                </div>
                <div className={`${stat.bgColor} p-3 rounded-lg`}>
                  <Icon className={`w-6 h-6 ${stat.textColor}`} />
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-md border border-slate-200">
          <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
            <Globe className="w-5 h-5 text-sky-500" />
            Ações Rápidas
          </h3>
          <div className="space-y-3">
            <button className="w-full flex items-center gap-3 p-4 rounded-lg border border-slate-200 hover:border-green-500 hover:bg-green-50 transition-all duration-200">
              <Globe className="w-5 h-5 text-green-500" />
              <div className="text-left">
                <p className="font-medium text-slate-800">Adicionar Continente</p>
                <p className="text-xs text-slate-500">Cadastrar novo continente</p>
              </div>
            </button>
            <button className="w-full flex items-center gap-3 p-4 rounded-lg border border-slate-200 hover:border-sky-500 hover:bg-sky-50 transition-all duration-200">
              <Flag className="w-5 h-5 text-sky-500" />
              <div className="text-left">
                <p className="font-medium text-slate-800">Adicionar País</p>
                <p className="text-xs text-slate-500">Cadastrar novo país</p>
              </div>
            </button>
            <button className="w-full flex items-center gap-3 p-4 rounded-lg border border-slate-200 hover:border-orange-500 hover:bg-orange-50 transition-all duration-200">
              <MapPin className="w-5 h-5 text-orange-500" />
              <div className="text-left">
                <p className="font-medium text-slate-800">Adicionar Cidade</p>
                <p className="text-xs text-slate-500">Cadastrar nova cidade</p>
              </div>
            </button>
          </div>
        </div>

        {/* API Integration Info */}
        <div className="bg-white rounded-xl p-6 shadow-md border border-slate-200">
          <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
            <Cloud className="w-5 h-5 text-purple-500" />
            Integrações Ativas
          </h3>
          <div className="space-y-4">
            <div className="flex items-start gap-3 p-4 bg-green-50 rounded-lg border border-green-200">
              <Flag className="w-5 h-5 text-green-600 mt-0.5" />
              <div>
                <p className="font-medium text-green-900">REST Countries API</p>
                <p className="text-sm text-green-700">Dados de países, bandeiras e moedas</p>
                <div className="mt-2 flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  <span className="text-xs text-green-600">Conectado</span>
                </div>
              </div>
            </div>
            <div className="flex items-start gap-3 p-4 bg-sky-50 rounded-lg border border-sky-200">
              <Cloud className="w-5 h-5 text-sky-600 mt-0.5" />
              <div>
                <p className="font-medium text-sky-900">OpenWeatherMap API</p>
                <p className="text-sm text-sky-700">Informações climáticas em tempo real</p>
                <div className="mt-2 flex items-center gap-2">
                  <div className="w-2 h-2 bg-sky-500 rounded-full animate-pulse" />
                  <span className="text-xs text-sky-600">Conectado</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-xl p-6 shadow-md border border-slate-200">
        <h3 className="text-lg font-bold text-slate-800 mb-4">Atividades Recentes</h3>
        <div className="space-y-3">
          {[
            { action: "País adicionado", item: "Brasil", time: "2 minutos atrás", color: "text-sky-600" },
            { action: "Cidade criada", item: "São Paulo", time: "5 minutos atrás", color: "text-orange-600" },
            { action: "Continente atualizado", item: "América do Sul", time: "10 minutos atrás", color: "text-green-600" },
          ].map((activity, index) => (
            <div key={index} className="flex items-center justify-between p-3 rounded-lg hover:bg-slate-50 transition-colors">
              <div className="flex items-center gap-3">
                <div className={`w-2 h-2 rounded-full ${activity.color.replace("text", "bg")}`} />
                <div>
                  <p className="text-sm font-medium text-slate-800">{activity.action}</p>
                  <p className={`text-xs ${activity.color}`}>{activity.item}</p>
                </div>
              </div>
              <span className="text-xs text-slate-500">{activity.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Dashboard
