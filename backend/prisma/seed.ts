// prisma/prisma.seed.ts
const path = require('path');
const { PrismaClient } = require(path.join(process.cwd(), 'node_modules','@prisma','client','.prisma','client','client.js'));

const prisma = new PrismaClient()

async function main() {
  console.log('Starting seed...')

  await prisma.city.deleteMany()
  await prisma.country.deleteMany()
  await prisma.continent.deleteMany()
  await prisma.user.deleteMany()

  const continents = await prisma.continent.createMany({
    data: [
      {
        con_name: 'América do Norte',
        con_description: 'Continente localizado no hemisfério norte',
      },
      {
        con_name: 'América do Sul',
        con_description: 'Continente localizado no hemisfério sul',
      },
      {
        con_name: 'Europa',
        con_description: 'Continente localizado no hemisfério norte',
      },
      {
        con_name: 'Ásia',
        con_description: 'Maior continente em área e população',
      },
      {
        con_name: 'África',
        con_description: 'Segundo maior continente em área e população',
      },
      {
        con_name: 'Oceania',
        con_description: 'Continente insular',
      },
      {
        con_name: 'América Central',
        con_description: 'Região que conecta as Américas do Norte e Sul',
      },
      {
        con_name: 'Caribe',
        con_description: 'Região insular das Caraíbas',
      },
      {
        con_name: 'Escandinávia',
        con_description: 'Região nórdica da Europa',
      },
      {
        con_name: 'Oriente Médio',
        con_description: 'Região que conecta Ásia, África e Europa',
      },
      {
        con_name: 'Sudeste Asiático',
        con_description: 'Sub-região da Ásia',
      },
      {
        con_name: 'África Subsaariana',
        con_description: 'Região da África ao sul do Saara',
      },
      {
        con_name: 'Bálcãs',
        con_description: 'Região no sudeste da Europa',
      },
      {
        con_name: 'América Anglo-Saxônica',
        con_description: 'Países de língua inglesa das Américas',
      },
      {
        con_name: 'América Latina',
        con_description: 'Países de línguas românicas das Américas',
      },
      {
        con_name: 'Europa Oriental',
        con_description: 'Parte oriental do continente europeu',
      },
      {
        con_name: 'Europa Ocidental',
        con_description: 'Parte ocidental do continente europeu',
      },
      {
        con_name: 'Norte da África',
        con_description: 'Região do norte do continente africano',
      },
      {
        con_name: 'Ásia Central',
        con_description: 'Região central do continente asiático',
      },
      {
        con_name: 'Antártida',
        con_description: 'Continente mais meridional',
      },
    ],
  })

  console.log(`Created ${continents.count} continents`)

  // Criar países
  const countries = await prisma.country.createMany({
    data: [
      {
        cou_name: 'Estados Unidos',
        cou_language: 'Inglês',
        cou_coin: 'Dólar Americano',
        cou_flag: '🇺🇸',
        cou_population: 331000000,
        con_id: 1,
      },
      {
        cou_name: 'Brasil',
        cou_language: 'Português',
        cou_coin: 'Real',
        cou_flag: '🇧🇷',
        cou_population: 213000000,
        con_id: 2,
      },
      {
        cou_name: 'França',
        cou_language: 'Francês',
        cou_coin: 'Euro',
        cou_flag: '🇫🇷',
        cou_population: 67000000,
        con_id: 3,
      },
      {
        cou_name: 'Japão',
        cou_language: 'Japonês',
        cou_coin: 'Iene',
        cou_flag: '🇯🇵',
        cou_population: 125000000,
        con_id: 4,
      },
      {
        cou_name: 'Nigéria',
        cou_language: 'Inglês',
        cou_coin: 'Naira',
        cou_flag: '🇳🇬',
        cou_population: 206000000,
        con_id: 5,
      },
      {
        cou_name: 'Austrália',
        cou_language: 'Inglês',
        cou_coin: 'Dólar Australiano',
        cou_flag: '🇦🇺',
        cou_population: 25600000,
        con_id: 6,
      },
      {
        cou_name: 'Argentina',
        cou_language: 'Espanhol',
        cou_coin: 'Peso Argentino',
        cou_flag: '🇦🇷',
        cou_population: 45100000,
        con_id: 2,
      },
      {
        cou_name: 'Alemanha',
        cou_language: 'Alemão',
        cou_coin: 'Euro',
        cou_flag: '🇩🇪',
        cou_population: 83100000,
        con_id: 3,
      },
      {
        cou_name: 'China',
        cou_language: 'Mandarim',
        cou_coin: 'Yuan',
        cou_flag: '🇨🇳',
        cou_population: 1402000000,
        con_id: 4,
      },
      {
        cou_name: 'Egito',
        cou_language: 'Árabe',
        cou_coin: 'Libra Egípcia',
        cou_flag: '🇪🇬',
        cou_population: 104000000,
        con_id: 5,
      },
      {
        cou_name: 'Nova Zelândia',
        cou_language: 'Inglês',
        cou_coin: 'Dólar Neozelandês',
        cou_flag: '🇳🇿',
        cou_population: 5000000,
        con_id: 6,
      },
      {
        cou_name: 'Canadá',
        cou_language: 'Inglês e Francês',
        cou_coin: 'Dólar Canadense',
        cou_flag: '🇨🇦',
        cou_population: 38000000,
        con_id: 1,
      },
      {
        cou_name: 'México',
        cou_language: 'Espanhol',
        cou_coin: 'Peso Mexicano',
        cou_flag: '🇲🇽',
        cou_population: 128000000,
        con_id: 1,
      },
      {
        cou_name: 'Itália',
        cou_language: 'Italiano',
        cou_coin: 'Euro',
        cou_flag: '🇮🇹',
        cou_population: 59500000,
        con_id: 3,
      },
      {
        cou_name: 'Índia',
        cou_language: 'Hindi e Inglês',
        cou_coin: 'Rupia Indiana',
        cou_flag: '🇮🇳',
        cou_population: 1380000000,
        con_id: 4,
      },
      {
        cou_name: 'África do Sul',
        cou_language: 'Africâner e Inglês',
        cou_coin: 'Rand',
        cou_flag: '🇿🇦',
        cou_population: 60000000,
        con_id: 5,
      },
      {
        cou_name: 'Chile',
        cou_language: 'Espanhol',
        cou_coin: 'Peso Chileno',
        cou_flag: '🇨🇱',
        cou_population: 19100000,
        con_id: 2,
      },
      {
        cou_name: 'Reino Unido',
        cou_language: 'Inglês',
        cou_coin: 'Libra Esterlina',
        cou_flag: '🇬🇧',
        cou_population: 67200000,
        con_id: 3,
      },
      {
        cou_name: 'Coreia do Sul',
        cou_language: 'Coreano',
        cou_coin: 'Won Sul-Coreano',
        cou_flag: '🇰🇷',
        cou_population: 51700000,
        con_id: 4,
      },
      {
        cou_name: 'Quênia',
        cou_language: 'Suaíli e Inglês',
        cou_coin: 'Xelim Queniano',
        cou_flag: '🇰🇪',
        cou_population: 53700000,
        con_id: 5,
      },
    ],
  })

  console.log(`Created ${countries.count} countries`)

  // Criar cidades
  const cities = await prisma.city.createMany({
    data: [
      {
        cit_name: 'Nova York',
        cit_population: 8419000,
        cit_latitude: 40.7128,
        cit_longitude: -74.0060,
        cou_id: 1,
      },
      {
        cit_name: 'São Paulo',
        cit_population: 12300000,
        cit_latitude: -23.5505,
        cit_longitude: -46.6333,
        cou_id: 2,
      },
      {
        cit_name: 'Paris',
        cit_population: 2148000,
        cit_latitude: 48.8566,
        cit_longitude: 2.3522,
        cou_id: 3,
      },
      {
        cit_name: 'Tóquio',
        cit_population: 13960000,
        cit_latitude: 35.6762,
        cit_longitude: 139.6503,
        cou_id: 4,
      },
      {
        cit_name: 'Lagos',
        cit_population: 14900000,
        cit_latitude: 6.5244,
        cit_longitude: 3.3792,
        cou_id: 5,
      },
      {
        cit_name: 'Sydney',
        cit_population: 5312000,
        cit_latitude: -33.8688,
        cit_longitude: 151.2093,
        cou_id: 6,
      },
      {
        cit_name: 'Buenos Aires',
        cit_population: 2890000,
        cit_latitude: -34.6037,
        cit_longitude: -58.3816,
        cou_id: 7,
      },
      {
        cit_name: 'Berlim',
        cit_population: 3645000,
        cit_latitude: 52.5200,
        cit_longitude: 13.4050,
        cou_id: 8,
      },
      {
        cit_name: 'Pequim',
        cit_population: 21540000,
        cit_latitude: 39.9042,
        cit_longitude: 116.4074,
        cou_id: 9,
      },
      {
        cit_name: 'Cairo',
        cit_population: 9500000,
        cit_latitude: 30.0444,
        cit_longitude: 31.2357,
        cou_id: 10,
      },
      {
        cit_name: 'Auckland',
        cit_population: 1657000,
        cit_latitude: -36.8509,
        cit_longitude: 174.7645,
        cou_id: 11,
      },
      {
        cit_name: 'Toronto',
        cit_population: 2732000,
        cit_latitude: 43.6532,
        cit_longitude: -79.3832,
        cou_id: 12,
      },
      {
        cit_name: 'Cidade do México',
        cit_population: 9200000,
        cit_latitude: 19.4326,
        cit_longitude: -99.1332,
        cou_id: 13,
      },
      {
        cit_name: 'Roma',
        cit_population: 2873000,
        cit_latitude: 41.9028,
        cit_longitude: 12.4964,
        cou_id: 14,
      },
      {
        cit_name: 'Mumbai',
        cit_population: 12480000,
        cit_latitude: 19.0760,
        cit_longitude: 72.8777,
        cou_id: 15,
      },
      {
        cit_name: 'Cidade do Cabo',
        cit_population: 4337000,
        cit_latitude: -33.9249,
        cit_longitude: 18.4241,
        cou_id: 16,
      },
      {
        cit_name: 'Santiago',
        cit_population: 6211000,
        cit_latitude: -33.4489,
        cit_longitude: -70.6693,
        cou_id: 17,
      },
      {
        cit_name: 'Londres',
        cit_population: 8982000,
        cit_latitude: 51.5074,
        cit_longitude: -0.1278,
        cou_id: 18,
      },
      {
        cit_name: 'Seul',
        cit_population: 9776000,
        cit_latitude: 37.5665,
        cit_longitude: 126.9780,
        cou_id: 19,
      },
      {
        cit_name: 'Nairóbi',
        cit_population: 4397000,
        cit_latitude: -1.2864,
        cit_longitude: 36.8172,
        cou_id: 20,
      },
    ],
  })

  console.log(`Created ${cities.count} cities`)

  // Criar usuários
  const users = await prisma.user.createMany({
    data: [
      {
        use_email: 'joao.silva@email.com',
        use_password: 'hashed_password_123',
        use_name: 'João Silva',
        use_role: 'user',
      },
      {
        use_email: 'maria.oliveira@email.com',
        use_password: 'hashed_password_456',
        use_name: 'Maria Oliveira',
        use_role: 'user',
      },
      {
        use_email: 'admin@email.com',
        use_password: 'hashed_admin_password',
        use_name: 'Administrador',
        use_role: 'admin',
      },
      {
        use_email: 'carlos.santos@email.com',
        use_password: 'hashed_password_789',
        use_name: 'Carlos Santos',
        use_role: 'user',
      },
      {
        use_email: 'ana.pereira@email.com',
        use_password: 'hashed_password_101',
        use_name: 'Ana Pereira',
        use_role: 'user',
      },
      {
        use_email: 'pedro.costa@email.com',
        use_password: 'hashed_password_102',
        use_name: 'Pedro Costa',
        use_role: 'user',
      },
      {
        use_email: 'julia.rodrigues@email.com',
        use_password: 'hashed_password_103',
        use_name: 'Julia Rodrigues',
        use_role: 'user',
      },
      {
        use_email: 'lucas.almeida@email.com',
        use_password: 'hashed_password_104',
        use_name: 'Lucas Almeida',
        use_role: 'user',
      },
      {
        use_email: 'fernanda.lima@email.com',
        use_password: 'hashed_password_105',
        use_name: 'Fernanda Lima',
        use_role: 'user',
      },
      {
        use_email: 'rafael.martins@email.com',
        use_password: 'hashed_password_106',
        use_name: 'Rafael Martins',
        use_role: 'user',
      },
      {
        use_email: 'isabela.ferreira@email.com',
        use_password: 'hashed_password_107',
        use_name: 'Isabela Ferreira',
        use_role: 'user',
      },
      {
        use_email: 'bruno.oliveira@email.com',
        use_password: 'hashed_password_108',
        use_name: 'Bruno Oliveira',
        use_role: 'user',
      },
      {
        use_email: 'camila.souza@email.com',
        use_password: 'hashed_password_109',
        use_name: 'Camila Souza',
        use_role: 'user',
      },
      {
        use_email: 'diegom.ribeiro@email.com',
        use_password: 'hashed_password_110',
        use_name: 'Diego Ribeiro',
        use_role: 'user',
      },
      {
        use_email: 'larissa.carvalho@email.com',
        use_password: 'hashed_password_111',
        use_name: 'Larissa Carvalho',
        use_role: 'user',
      },
      {
        use_email: 'gustavo.henrique@email.com',
        use_password: 'hashed_password_112',
        use_name: 'Gustavo Henrique',
        use_role: 'user',
      },
      {
        use_email: 'patricia.melo@email.com',
        use_password: 'hashed_password_113',
        use_name: 'Patrícia Melo',
        use_role: 'user',
      },
      {
        use_email: 'rodrigo.santana@email.com',
        use_password: 'hashed_password_114',
        use_name: 'Rodrigo Santana',
        use_role: 'user',
      },
      {
        use_email: 'amanda.cristina@email.com',
        use_password: 'hashed_password_115',
        use_name: 'Amanda Cristina',
        use_role: 'user',
      },
      {
        use_email: 'thiago.oliveira@email.com',
        use_password: 'hashed_password_116',
        use_name: 'Thiago Oliveira',
        use_role: 'user',
      },
    ],
  })

  console.log(`Created ${users.count} users`)
  console.log('Seed completed successfully!')
}

main()
  .catch((e) => {
    console.error('Seed error:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })