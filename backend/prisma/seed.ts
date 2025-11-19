// prisma/prisma.seed.ts
import { PrismaClient } from '@prisma/client';

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
    ],
  })

  console.log(`Created ${countries.count} countries`)

  // Criar cidades
  const cities = await prisma.city.createMany({
    data: [
      // Cidades dos Estados Unidos
      {
        cit_name: 'Nova York',
        cit_population: 8419000,
        cit_latitude: 40.7128,
        cit_longitude: -74.0060,
        cou_id: 1,
      },
      {
        cit_name: 'Los Angeles',
        cit_population: 3980000,
        cit_latitude: 34.0522,
        cit_longitude: -118.2437,
        cou_id: 1,
      },
      {
        cit_name: 'Chicago',
        cit_population: 2716000,
        cit_latitude: 41.8781,
        cit_longitude: -87.6298,
        cou_id: 1,
      },
      {
        cit_name: 'Miami',
        cit_population: 463000,
        cit_latitude: 25.7617,
        cit_longitude: -80.1918,
        cou_id: 1,
      },

      // Cidades do Brasil
      {
        cit_name: 'São Paulo',
        cit_population: 12300000,
        cit_latitude: -23.5505,
        cit_longitude: -46.6333,
        cou_id: 2,
      },
      {
        cit_name: 'Rio de Janeiro',
        cit_population: 6748000,
        cit_latitude: -22.9068,
        cit_longitude: -43.1729,
        cou_id: 2,
      },
      {
        cit_name: 'Brasília',
        cit_population: 3055000,
        cit_latitude: -15.7797,
        cit_longitude: -47.9297,
        cou_id: 2,
      },
      {
        cit_name: 'Salvador',
        cit_population: 2887000,
        cit_latitude: -12.9714,
        cit_longitude: -38.5014,
        cou_id: 2,
      },
      {
        cit_name: 'Fortaleza',
        cit_population: 2669000,
        cit_latitude: -3.7319,
        cit_longitude: -38.5267,
        cou_id: 2,
      },

      // Cidades da França
      {
        cit_name: 'Paris',
        cit_population: 2148000,
        cit_latitude: 48.8566,
        cit_longitude: 2.3522,
        cou_id: 3,
      },
      {
        cit_name: 'Marselha',
        cit_population: 861000,
        cit_latitude: 43.2965,
        cit_longitude: 5.3698,
        cou_id: 3,
      },
      {
        cit_name: 'Lyon',
        cit_population: 513000,
        cit_latitude: 45.7640,
        cit_longitude: 4.8357,
        cou_id: 3,
      },

      // Cidades do Japão
      {
        cit_name: 'Tóquio',
        cit_population: 13960000,
        cit_latitude: 35.6762,
        cit_longitude: 139.6503,
        cou_id: 4,
      },
      {
        cit_name: 'Osaka',
        cit_population: 2691000,
        cit_latitude: 34.6937,
        cit_longitude: 135.5023,
        cou_id: 4,
      },
      {
        cit_name: 'Kyoto',
        cit_population: 1475000,
        cit_latitude: 35.0116,
        cit_longitude: 135.7681,
        cou_id: 4,
      },
      {
        cit_name: 'Yokohama',
        cit_population: 3720000,
        cit_latitude: 35.4437,
        cit_longitude: 139.6380,
        cou_id: 4,
      },

      // Cidades da Nigéria
      {
        cit_name: 'Lagos',
        cit_population: 14900000,
        cit_latitude: 6.5244,
        cit_longitude: 3.3792,
        cou_id: 5,
      },
      {
        cit_name: 'Abuja',
        cit_population: 3760000,
        cit_latitude: 9.0765,
        cit_longitude: 7.3986,
        cou_id: 5,
      },
      {
        cit_name: 'Kano',
        cit_population: 3740000,
        cit_latitude: 12.0022,
        cit_longitude: 8.5920,
        cou_id: 5,
      },

      // Cidades da Austrália
      {
        cit_name: 'Sydney',
        cit_population: 5312000,
        cit_latitude: -33.8688,
        cit_longitude: 151.2093,
        cou_id: 6,
      },
      {
        cit_name: 'Melbourne',
        cit_population: 5000000,
        cit_latitude: -37.8136,
        cit_longitude: 144.9631,
        cou_id: 6,
      },
      {
        cit_name: 'Brisbane',
        cit_population: 2480000,
        cit_latitude: -27.4698,
        cit_longitude: 153.0251,
        cou_id: 6,
      },

      // Cidades da Argentina
      {
        cit_name: 'Buenos Aires',
        cit_population: 2890000,
        cit_latitude: -34.6037,
        cit_longitude: -58.3816,
        cou_id: 7,
      },
      {
        cit_name: 'Córdoba',
        cit_population: 1320000,
        cit_latitude: -31.4201,
        cit_longitude: -64.1888,
        cou_id: 7,
      },

      // Cidades da Alemanha
      {
        cit_name: 'Berlim',
        cit_population: 3645000,
        cit_latitude: 52.5200,
        cit_longitude: 13.4050,
        cou_id: 8,
      },
      {
        cit_name: 'Hamburgo',
        cit_population: 1841000,
        cit_latitude: 53.5511,
        cit_longitude: 9.9937,
        cou_id: 8,
      },
      {
        cit_name: 'Munique',
        cit_population: 1472000,
        cit_latitude: 48.1351,
        cit_longitude: 11.5820,
        cou_id: 8,
      },

      // Cidades da China
      {
        cit_name: 'Pequim',
        cit_population: 21540000,
        cit_latitude: 39.9042,
        cit_longitude: 116.4074,
        cou_id: 9,
      },
      {
        cit_name: 'Xangai',
        cit_population: 26320000,
        cit_latitude: 31.2304,
        cit_longitude: 121.4737,
        cou_id: 9,
      },
      {
        cit_name: 'Guangzhou',
        cit_population: 14900000,
        cit_latitude: 23.1291,
        cit_longitude: 113.2644,
        cou_id: 9,
      },
      {
        cit_name: 'Shenzhen',
        cit_population: 12500000,
        cit_latitude: 22.5431,
        cit_longitude: 114.0579,
        cou_id: 9,
      },

      // Cidades do Egito
      {
        cit_name: 'Cairo',
        cit_population: 9500000,
        cit_latitude: 30.0444,
        cit_longitude: 31.2357,
        cou_id: 10,
      },
      {
        cit_name: 'Alexandria',
        cit_population: 5210000,
        cit_latitude: 31.2001,
        cit_longitude: 29.9187,
        cou_id: 10,
      },

      // Cidades da Nova Zelândia
      {
        cit_name: 'Auckland',
        cit_population: 1657000,
        cit_latitude: -36.8509,
        cit_longitude: 174.7645,
        cou_id: 11,
      },
      {
        cit_name: 'Wellington',
        cit_population: 412000,
        cit_latitude: -41.2865,
        cit_longitude: 174.7762,
        cou_id: 11,
      },

      // Cidades do Canadá
      {
        cit_name: 'Toronto',
        cit_population: 2732000,
        cit_latitude: 43.6532,
        cit_longitude: -79.3832,
        cou_id: 12,
      },
      {
        cit_name: 'Vancouver',
        cit_population: 675000,
        cit_latitude: 49.2827,
        cit_longitude: -123.1207,
        cou_id: 12,
      },
      {
        cit_name: 'Montreal',
        cit_population: 1780000,
        cit_latitude: 45.5017,
        cit_longitude: -73.5673,
        cou_id: 12,
      },

      // Cidades do México
      {
        cit_name: 'Cidade do México',
        cit_population: 9200000,
        cit_latitude: 19.4326,
        cit_longitude: -99.1332,
        cou_id: 13,
      },
      {
        cit_name: 'Guadalajara',
        cit_population: 1495000,
        cit_latitude: 20.6597,
        cit_longitude: -103.3496,
        cou_id: 13,
      },

      // Cidades da Itália
      {
        cit_name: 'Roma',
        cit_population: 2873000,
        cit_latitude: 41.9028,
        cit_longitude: 12.4964,
        cou_id: 14,
      },
      {
        cit_name: 'Milão',
        cit_population: 1366000,
        cit_latitude: 45.4642,
        cit_longitude: 9.1900,
        cou_id: 14,
      },
      {
        cit_name: 'Nápoles',
        cit_population: 967000,
        cit_latitude: 40.8518,
        cit_longitude: 14.2681,
        cou_id: 14,
      },

      // Cidades da Índia
      {
        cit_name: 'Mumbai',
        cit_population: 12480000,
        cit_latitude: 19.0760,
        cit_longitude: 72.8777,
        cou_id: 15,
      },
      {
        cit_name: 'Delhi',
        cit_population: 16790000,
        cit_latitude: 28.7041,
        cit_longitude: 77.1025,
        cou_id: 15,
      },
      {
        cit_name: 'Bangalore',
        cit_population: 8440000,
        cit_latitude: 12.9716,
        cit_longitude: 77.5946,
        cou_id: 15,
      },
      {
        cit_name: 'Chennai',
        cit_population: 6720000,
        cit_latitude: 13.0827,
        cit_longitude: 80.2707,
        cou_id: 15,
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