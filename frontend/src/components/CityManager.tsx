import React, { useState, useEffect } from "react"
import {MapPin, Plus, Edit2, Trash2, Search, X, Flag, Globe, Cloud, Thermometer} from 'lucide-react'
import { fetchCities, createCity, updateCity, deleteCity, fetchCountries } from "../lib/api"

interface City {
  id: string
  nome: string
  populacao: number
  latitude: number
  longitude: number
  idPais: string
  clima?: string
  temperatura?: number
}

function CityManager() {
  const [cities, setCities] = useState<City[]>([])
  const [countries, setCountries] = useState<{ id: string; nome: string; continente?: string }[]>([])

  useEffect(() => {
    let mounted = true
    ;(async () => {
      try {
        const [cCities, cCountries] = await Promise.all([fetchCities(), fetchCountries()])
        if (mounted) {
          setCities(cCities)
          setCountries(cCountries.map((c) => ({ id: c.id, nome: c.nome, continente: '' })))
        }
      } catch (err) {
        console.error('Erro ao carregar cidades/países', err)
      }
    })()
    return () => {
      mounted = false
    }
  }, [])

  const [showModal, setShowModal] = useState(false)
  const [editingCity, setEditingCity] = useState<City | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterCountry, setFilterCountry] = useState("")
  const [formData, setFormData] = useState({
    nome: "",
    populacao: 0,
    latitude: 0,
    longitude: 0,
    idPais: "",
  })

  const filteredCities = cities.filter((city) => {
    const matchesSearch = city.nome.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCountry = !filterCountry || city.idPais === filterCountry
    return matchesSearch && matchesCountry
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    ;(async () => {
      try {
        if (editingCity) {
          const updated = await updateCity(editingCity.id, formData)
          setCities((prev) => prev.map((c) => (c.id === updated.id ? updated : c)))
        } else {
          const created = await createCity(formData)
          setCities((prev) => [...prev, created])
        }
        closeModal()
      } catch (err) {
        console.error('Erro ao salvar cidade', err)
        alert('Erro ao salvar cidade. Verifique o backend e CORS.')
      }
    })()
  }

  const handleDelete = (id: string) => {
    if (window.confirm("Tem certeza que deseja excluir esta cidade?")) {
      ;(async () => {
        try {
          await deleteCity(id)
          setCities((prev) => prev.filter((c) => c.id !== id))
        } catch (err) {
          console.error('Erro ao deletar cidade', err)
          alert('Erro ao excluir cidade. Verifique o backend e CORS.')
        }
      })()
    }
  }

  const openModal = (city?: City) => {
    if (city) {
      setEditingCity(city)
      setFormData({
        nome: city.nome,
        populacao: city.populacao,
        latitude: city.latitude,
        longitude: city.longitude,
        idPais: city.idPais,
      })
    } else {
      setEditingCity(null)
      setFormData({
        nome: "",
        populacao: 0,
        latitude: 0,
        longitude: 0,
        idPais: "",
      })
    }
    setShowModal(true)
  }

  const closeModal = () => {
    setShowModal(false)
    setEditingCity(null)
  }

  const getCountryInfo = (id: string) => {
    return countries.find((c) => c.id === id)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
            <MapPin className="w-7 h-7 text-orange-500" />
            Gerenciar Cidades
          </h2>
          <p className="text-sm text-slate-600 mt-1">Cadastre e gerencie informações sobre cidades</p>
        </div>
        <button
          onClick={() => openModal()}
          className="flex items-center gap-2 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors shadow-md"
        >
          <Plus className="w-4 h-4" />
          Nova Cidade
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg p-4 shadow-md border border-slate-200 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder="Buscar cidade..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>
          <select
            value={filterCountry}
            onChange={(e) => setFilterCountry(e.target.value)}
            className="px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
          >
            <option value="">Todos os países</option>
            {countries.map((country) => (
              <option key={country.id} value={country.id}>
                {country.nome}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Cities List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredCities.map((city) => {
          const countryInfo = getCountryInfo(city.idPais)
          return (
            <div
              key={city.id}
              className="bg-white rounded-xl p-6 shadow-md border border-slate-200 hover:shadow-lg transition-all duration-300"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="bg-orange-100 p-3 rounded-lg">
                    <MapPin className="w-6 h-6 text-orange-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-800">{city.nome}</h3>
                    <div className="flex items-center gap-2 text-sm text-slate-600">
                      <Flag className="w-3 h-3" />
                      <span>{countryInfo?.nome}</span>
                      <span className="text-slate-400">•</span>
                      <Globe className="w-3 h-3" />
                      <span>{countryInfo?.continente}</span>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => openModal(city)}
                    className="p-2 text-sky-600 hover:bg-sky-50 rounded-lg transition-colors"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(city.id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="bg-slate-50 p-3 rounded-lg">
                    <p className="text-slate-600 text-xs mb-1">População</p>
                    <p className="font-semibold text-slate-800">{city.populacao.toLocaleString("pt-BR")}</p>
                  </div>
                  <div className="bg-slate-50 p-3 rounded-lg">
                    <p className="text-slate-600 text-xs mb-1">Coordenadas</p>
                    <p className="font-semibold text-slate-800 text-xs">
                      {city.latitude.toFixed(2)}, {city.longitude.toFixed(2)}
                    </p>
                  </div>
                </div>

                {/* Weather Info (API Integration Preview) */}
                {city.clima && (
                  <div className="bg-gradient-to-r from-sky-50 to-blue-50 p-4 rounded-lg border border-sky-200">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Cloud className="w-5 h-5 text-sky-600" />
                        <div>
                          <p className="text-xs text-sky-700 font-medium">Clima Atual</p>
                          <p className="text-sm text-sky-900">{city.clima}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-1">
                        <Thermometer className="w-5 h-5 text-orange-500" />
                        <span className="text-2xl font-bold text-slate-800">{city.temperatura}°</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>

      {filteredCities.length === 0 && (
        <div className="bg-white rounded-xl p-12 text-center shadow-md border border-slate-200">
          <MapPin className="w-16 h-16 text-slate-300 mx-auto mb-4" />
          <p className="text-slate-600">Nenhuma cidade encontrada</p>
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 overflow-y-auto">
          <div className="bg-white rounded-xl max-w-md w-full p-6 shadow-2xl my-8">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-slate-800">
                {editingCity ? "Editar Cidade" : "Nova Cidade"}
              </h3>
              <button onClick={closeModal} className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
                <X className="w-5 h-5 text-slate-600" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Nome da Cidade *</label>
                <input
                  type="text"
                  value={formData.nome}
                  onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">População *</label>
                <input
                  type="number"
                  value={formData.populacao}
                  onChange={(e) => setFormData({ ...formData, populacao: Number(e.target.value) })}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Latitude *</label>
                  <input
                    type="number"
                    step="0.0001"
                    value={formData.latitude}
                    onChange={(e) => setFormData({ ...formData, latitude: Number(e.target.value) })}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Longitude *</label>
                  <input
                    type="number"
                    step="0.0001"
                    value={formData.longitude}
                    onChange={(e) => setFormData({ ...formData, longitude: Number(e.target.value) })}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">País *</label>
                <select
                  value={formData.idPais}
                  onChange={(e) => setFormData({ ...formData, idPais: e.target.value })}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  required
                >
                  <option value="">Selecione um país</option>
                  {countries.map((country) => (
                    <option key={country.id} value={country.id}>
                      {country.nome}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={closeModal}
                  className="flex-1 px-4 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
                >
                  {editingCity ? "Salvar" : "Criar"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default CityManager
