import React, { useEffect, useState } from "react"
import {Globe, Plus, Edit2, Trash2, Search, X} from 'lucide-react'

interface Continent {
  id: string
  nome: string
  descricao: string
}

function ContinentManager() {
  const [continents, setContinents] = useState<Continent[]>([
    { id: "1", nome: "África", descricao: "Segundo maior continente do mundo" },
    { id: "2", nome: "Américas", descricao: "Continente dividido em América do Norte e do Sul" },
    { id: "3", nome: "Ásia", descricao: "Maior continente em área e população" },
    { id: "4", nome: "Europa", descricao: "Continente com grande desenvolvimento econômico" },
    { id: "5", nome: "Oceania", descricao: "Menor continente em área terrestre" },
  ])
  
  const [showModal, setShowModal] = useState(false)
  const [editingContinent, setEditingContinent] = useState<Continent | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [formData, setFormData] = useState({ nome: "", descricao: "" })
  
  useEffect(() => {
    console.log(formData)
  }, [formData])

  const filteredContinents = continents.filter((continent) =>
    continent.nome.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (editingContinent) {
      setContinents(continents.map((c) => 
        c.id === editingContinent.id ? { ...c, ...formData } : c
      ))
    } else {
      setContinents([...continents, { id: Date.now().toString(), ...formData }])
    }
    closeModal()
  }

  const handleDelete = (id: string) => {
    if (window.confirm("Tem certeza que deseja excluir este continente?")) {
      setContinents(continents.filter((c) => c.id !== id))
    }
  }

  const openModal = (continent?: Continent) => {
    if (continent) {
      setEditingContinent(continent)
      setFormData({ nome: continent.nome, descricao: continent.descricao })
    } else {
      setEditingContinent(null)
      setFormData({ nome: "", descricao: "" })
    }
    setShowModal(true)
  }

  const closeModal = () => {
    setShowModal(false)
    setEditingContinent(null)
    setFormData({ nome: "", descricao: "" })
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
            <Globe className="w-7 h-7 text-green-500" />
            Gerenciar Continentes
          </h2>
          <p className="text-sm text-slate-600 mt-1">Cadastre e gerencie informações sobre continentes</p>
        </div>
        <button
          onClick={() => openModal()}
          className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors shadow-md"
        >
          <Plus className="w-4 h-4" />
          Novo Continente
        </button>
      </div>

      {/* Search Bar */}
      <div className="bg-white rounded-lg p-4 shadow-md border border-slate-200">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input
            type="text"
            placeholder="Buscar continente..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>
      </div>

      {/* Continents List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredContinents.map((continent) => (
          <div
            key={continent.id}
            className="bg-white rounded-xl p-6 shadow-md border border-slate-200 hover:shadow-lg transition-all duration-300 hover:scale-105"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="bg-green-100 p-3 rounded-lg">
                <Globe className="w-6 h-6 text-green-600" />
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => openModal(continent)}
                  className="p-2 text-sky-600 hover:bg-sky-50 rounded-lg transition-colors"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(continent.id)}
                  className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
            <h3 className="text-lg font-bold text-slate-800 mb-2">{continent.nome}</h3>
            <p className="text-sm text-slate-600">{continent.descricao}</p>
          </div>
        ))}
      </div>

      {filteredContinents.length === 0 && (
        <div className="bg-white rounded-xl p-12 text-center shadow-md border border-slate-200">
          <Globe className="w-16 h-16 text-slate-300 mx-auto mb-4" />
          <p className="text-slate-600">Nenhum continente encontrado</p>
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-md w-full p-6 shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-slate-800">
                {editingContinent ? "Editar Continente" : "Novo Continente"}
              </h3>
              <button onClick={closeModal} className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
                <X className="w-5 h-5 text-slate-600" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Nome do Continente *
                </label>
                <input
                  type="text"
                  value={formData.nome}
                  onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Descrição *
                </label>
                <textarea
                  value={formData.descricao}
                  onChange={(e) => setFormData({ ...formData, descricao: e.target.value })}
                  rows={3}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
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
                  className="flex-1 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                >
                  {editingContinent ? "Salvar" : "Criar"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default ContinentManager
