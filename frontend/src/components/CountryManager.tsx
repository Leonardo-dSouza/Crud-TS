import React, { useState, useEffect } from "react"
import {Flag, Plus, Edit2, Trash2, Search, X, Globe, Users} from 'lucide-react'
import { fetchCountries, createCountry, updateCountry, deleteCountry, fetchContinents } from "../lib/api"

interface Country {
  id: string
  nome: string
  populacao: number
  idiomaOficial: string
  moeda: string
  idContinente: string
  bandeira?: string
}

function CountryManager() {
  const [countries, setCountries] = useState<Country[]>([])

  const [continents, setContinents] = useState<{ id: string; nome: string }[]>([])

  const [showModal, setShowModal] = useState(false)
  const [editingCountry, setEditingCountry] = useState<Country | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterContinent, setFilterContinent] = useState("")
  const [formData, setFormData] = useState({
    nome: "",
    populacao: 0,
    idiomaOficial: "",
    moeda: "",
    idContinente: "",
    bandeira: "",
  })

  const filteredCountries = countries.filter((country) => {
    const matchesSearch = country.nome.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesContinent = !filterContinent || country.idContinente === filterContinent
    return matchesSearch && matchesContinent
  })

  useEffect(() => {
    let mounted = true
    ;(async () => {
      try {
        const [cCountries, cContinents] = await Promise.all([fetchCountries(), fetchContinents()])
        if (mounted) {
          setCountries(cCountries)
          setContinents(cContinents.map((c) => ({ id: c.id, nome: c.nome })))
        }
      } catch (err) {
        console.error('Erro ao carregar países/continentes', err)
      }
    })()
    return () => {
      mounted = false
    }
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    ;(async () => {
      try {
        if (editingCountry) {
          const updated = await updateCountry(editingCountry.id, formData)
          setCountries((prev) => prev.map((c) => (c.id === updated.id ? updated : c)))
        } else {
          const created = await createCountry(formData)
          setCountries((prev) => [...prev, created])
        }
        closeModal()
      } catch (err) {
        console.error('Erro ao salvar país', err)
        alert('Erro ao salvar país. Verifique o backend e CORS.')
      }
    })()
  }

  const handleDelete = (id: string) => {
    if (window.confirm("Tem certeza que deseja excluir este país?")) {
      ;(async () => {
        try {
          await deleteCountry(id)
          setCountries((prev) => prev.filter((c) => c.id !== id))
        } catch (err) {
          console.error('Erro ao deletar país', err)
          alert('Erro ao excluir país. Verifique o backend e CORS.')
        }
      })()
    }
  }

  const openModal = (country?: Country) => {
    if (country) {
      setEditingCountry(country)
      setFormData({
        nome: country.nome,
        populacao: country.populacao,
        idiomaOficial: country.idiomaOficial,
        moeda: country.moeda,
        idContinente: country.idContinente,
        bandeira: country.bandeira || "",
      })
    } else {
      setEditingCountry(null)
      setFormData({
        nome: "",
        populacao: 0,
        idiomaOficial: "",
        moeda: "",
        idContinente: "",
        bandeira: "",
      })
    }
    setShowModal(true)
  }

  const closeModal = () => {
    setShowModal(false)
    setEditingCountry(null)
  }

  const getContinentName = (id: string) => {
    return continents.find((c) => c.id === id)?.nome || "N/A"
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
            <Flag className="w-7 h-7 text-sky-500" />
            Gerenciar Países
          </h2>
          <p className="text-sm text-slate-600 mt-1">Cadastre e gerencie informações sobre países</p>
        </div>
        <button
          onClick={() => openModal()}
          className="flex items-center gap-2 px-4 py-2 bg-sky-500 text-white rounded-lg hover:bg-sky-600 transition-colors shadow-md"
        >
          <Plus className="w-4 h-4" />
          Novo País
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg p-4 shadow-md border border-slate-200 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder="Buscar país..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
            />
          </div>
          <select
            value={filterContinent}
            onChange={(e) => setFilterContinent(e.target.value)}
            className="px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
          >
            <option value="">Todos os continentes</option>
            {continents.map((continent) => (
              <option key={continent.id} value={continent.id}>
                {continent.nome}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Countries List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredCountries.map((country) => (
          <div
            key={country.id}
            className="bg-white rounded-xl p-6 shadow-md border border-slate-200 hover:shadow-lg transition-all duration-300"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="text-4xl">{country.bandeira || "🏳️"}</div>
                <div>
                  <h3 className="text-lg font-bold text-slate-800">{country.nome}</h3>
                  <p className="text-sm text-slate-600 flex items-center gap-1">
                    <Globe className="w-3 h-3" />
                    {getContinentName(country.idContinente)}
                  </p>
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => openModal(country)}
                  className="p-2 text-sky-600 hover:bg-sky-50 rounded-lg transition-colors"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(country.id)}
                  className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2 text-slate-700">
                <Users className="w-4 h-4 text-slate-400" />
                <span className="font-medium">População:</span>
                <span>{country.populacao.toLocaleString("pt-BR")}</span>
              </div>
              <div className="flex items-center gap-2 text-slate-700">
                <span className="font-medium">Idioma:</span>
                <span>{country.idiomaOficial}</span>
              </div>
              <div className="flex items-center gap-2 text-slate-700">
                <span className="font-medium">Moeda:</span>
                <span>{country.moeda}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredCountries.length === 0 && (
        <div className="bg-white rounded-xl p-12 text-center shadow-md border border-slate-200">
          <Flag className="w-16 h-16 text-slate-300 mx-auto mb-4" />
          <p className="text-slate-600">Nenhum país encontrado</p>
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 overflow-y-auto">
          <div className="bg-white rounded-xl max-w-md w-full p-6 shadow-2xl my-8">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-slate-800">
                {editingCountry ? "Editar País" : "Novo País"}
              </h3>
              <button onClick={closeModal} className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
                <X className="w-5 h-5 text-slate-600" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Nome do País *</label>
                <input
                  type="text"
                  value={formData.nome}
                  onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">População *</label>
                <input
                  type="number"
                  value={formData.populacao}
                  onChange={(e) => setFormData({ ...formData, populacao: Number(e.target.value) })}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Idioma Oficial *</label>
                <input
                  type="text"
                  value={formData.idiomaOficial}
                  onChange={(e) => setFormData({ ...formData, idiomaOficial: e.target.value })}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Moeda *</label>
                <input
                  type="text"
                  value={formData.moeda}
                  onChange={(e) => setFormData({ ...formData, moeda: e.target.value })}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
                  required
                  placeholder="Ex: Real (BRL)"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Continente *</label>
                <select
                  value={formData.idContinente}
                  onChange={(e) => setFormData({ ...formData, idContinente: e.target.value })}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
                  required
                >
                  <option value="">Selecione um continente</option>
                  {continents.map((continent) => (
                    <option key={continent.id} value={continent.id}>
                      {continent.nome}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Bandeira (Emoji)</label>
                <input
                  type="text"
                  value={formData.bandeira}
                  onChange={(e) => setFormData({ ...formData, bandeira: e.target.value })}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
                  placeholder="Ex: 🇧🇷"
                />
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
                  className="flex-1 px-4 py-2 bg-sky-500 text-white rounded-lg hover:bg-sky-600 transition-colors"
                >
                  {editingCountry ? "Salvar" : "Criar"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default CountryManager
