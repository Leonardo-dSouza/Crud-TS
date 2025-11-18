const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:3000'

export interface Continent {
  id: string
  nome: string
  descricao: string
}

export interface Country {
  id: string
  nome: string
  populacao: number
  idiomaOficial: string
  moeda: string
  idContinente: string
  bandeira?: string
}

export interface City {
  id: string
  nome: string
  populacao: number
  latitude: number
  longitude: number
  idPais: string
  clima?: string
  temperatura?: number
}

async function handleRes(res: Response) {
  const text = await res.text()
  let data: any = undefined
  try {
    data = text ? JSON.parse(text) : undefined
  } catch (e) {
    data = text
  }
  if (!res.ok) {
    const err = new Error((data && data.message) || res.statusText)
    ;(err as any).status = res.status
    ;(err as any).body = data
    throw err
  }
  return data
}

// --- mapping helpers between backend fields and frontend models ---
const mapContinentFromApi = (item: any): Continent => ({
  id: String(item.con_id),
  nome: item.con_name,
  descricao: item.con_description,
})

const mapContinentToApi = (payload: Partial<Continent>) => ({
  con_name: payload.nome,
  con_description: payload.descricao,
})

// Continents (backend uses /continent and fields con_*)
export const fetchContinents = async (): Promise<Continent[]> => {
  const res = await fetch(`${API_BASE}/continent`)
  const data = await handleRes(res)
  return Array.isArray(data) ? data.map(mapContinentFromApi) : []
}

export const createContinent = async (payload: Omit<Continent, 'id'>): Promise<Continent> => {
  const res = await fetch(`${API_BASE}/continent`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(mapContinentToApi(payload as any)),
  })
  const data = await handleRes(res)
  return mapContinentFromApi(data)
}

export const updateContinent = async (id: string, payload: Partial<Continent>): Promise<Continent> => {
  const res = await fetch(`${API_BASE}/continent/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(mapContinentToApi(payload)),
  })
  const data = await handleRes(res)
  return mapContinentFromApi(data)
}

export const deleteContinent = async (id: string): Promise<void> => {
  const res = await fetch(`${API_BASE}/continent/${id}`, { method: 'DELETE' })
  return handleRes(res)
}

// Countries
const mapCountryFromApi = (item: any): Country => ({
  id: String(item.cou_id),
  nome: item.cou_name,
  populacao: item.cou_population,
  idiomaOficial: item.cou_language,
  moeda: item.cou_coin,
  idContinente: String(item.con_id ?? item.con_id),
  bandeira: item.cou_flag,
})

const mapCountryToApi = (payload: Partial<Country>) => ({
  cou_name: payload.nome,
  cou_language: payload.idiomaOficial,
  cou_coin: payload.moeda,
  cou_flag: payload.bandeira,
  cou_population: payload.populacao,
  con_id: payload.idContinente,
})

// Countries (backend uses /country and fields cou_*)
export const fetchCountries = async (): Promise<Country[]> => {
  const res = await fetch(`${API_BASE}/country`)
  const data = await handleRes(res)
  return Array.isArray(data) ? data.map(mapCountryFromApi) : []
}

export const createCountry = async (payload: Omit<Country, 'id'>): Promise<Country> => {
  const res = await fetch(`${API_BASE}/country`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(mapCountryToApi(payload as any)),
  })
  const data = await handleRes(res)
  return mapCountryFromApi(data)
}

export const updateCountry = async (id: string, payload: Partial<Country>): Promise<Country> => {
  const res = await fetch(`${API_BASE}/country/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(mapCountryToApi(payload)),
  })
  const data = await handleRes(res)
  return mapCountryFromApi(data)
}

export const deleteCountry = async (id: string): Promise<void> => {
  const res = await fetch(`${API_BASE}/country/${id}`, { method: 'DELETE' })
  return handleRes(res)
}

// Cities
const mapCityFromApi = (item: any): City => ({
  id: String(item.cit_id),
  nome: item.cit_name,
  populacao: item.cit_population,
  latitude: item.cit_latitude,
  longitude: item.cit_longitude,
  idPais: String(item.cou_id ?? item.cou_id),
})

const mapCityToApi = (payload: Partial<City>) => ({
  cit_name: payload.nome,
  cit_population: payload.populacao,
  cit_latitude: payload.latitude,
  cit_longitude: payload.longitude,
  cou_id: payload.idPais,
})

// Cities (backend uses /city and fields cit_*)
export const fetchCities = async (): Promise<City[]> => {
  const res = await fetch(`${API_BASE}/city`)
  const data = await handleRes(res)
  return Array.isArray(data) ? data.map(mapCityFromApi) : []
}

export const createCity = async (payload: Omit<City, 'id'>): Promise<City> => {
  const res = await fetch(`${API_BASE}/city`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(mapCityToApi(payload as any)),
  })
  const data = await handleRes(res)
  return mapCityFromApi(data)
}

export const updateCity = async (id: string, payload: Partial<City>): Promise<City> => {
  const res = await fetch(`${API_BASE}/city/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(mapCityToApi(payload)),
  })
  const data = await handleRes(res)
  return mapCityFromApi(data)
}

export const deleteCity = async (id: string): Promise<void> => {
  const res = await fetch(`${API_BASE}/city/${id}`, { method: 'DELETE' })
  return handleRes(res)
}

export default {
  fetchContinents,
  createContinent,
  updateContinent,
  deleteContinent,
  fetchCountries,
  createCountry,
  updateCountry,
  deleteCountry,
  fetchCities,
  createCity,
  updateCity,
  deleteCity,
}
