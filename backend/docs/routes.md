# 📍 Rotas da Aplicação

Documentação completa das rotas e funcionalidades que precisam ser criadas no projeto.

---

## 📊 Dashboard

Página principal com informações resumidas do sistema.

### Cards Principais

| Card | Endpoint | Descrição |
|------|----------|-----------|
| 🏙️ Cidades | `GET /city/amount` | Retorna a quantidade de cidades registradas |
| 🌍 Países | `GET /country/amount` | Retorna a quantidade de países |
| 🌎 Continentes | `GET /continent/amount` | Retorna a quantidade de continentes + população |

### Ações Rápidas

- ➕ **Criar Cidade** - Formulário rápido
- ➕ **Criar País** - Formulário rápido
- ➕ **Criar Continente** - Formulário rápido

### Integrações Ativas

- `GET /integrations/active` - Retorna quantidade de APIs ativas

### Atividades Recentes

- `GET /activities/recent` - Retorna os últimos logs do banco de dados
  - Exemplos: país adicionado, cidade criada, continente atualizado

---

## 🌎 Continentes

Gerenciamento completo de continentes.

### Operações

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| `GET` | `/continent` | Listar continentes com paginação |
| `GET` | `/continent/:id` | Buscar continente por ID |
| `POST` | `/continent` | Criar novo continente |
| `PATCH` | `/continent/:id` | Atualizar continente |
| `DELETE` | `/continent/:id` | Deletar continente |

### Filtros e Paginação

- 🔍 **Filtrar por nome** - `?search=Europa`
- 📄 **Paginação** - `?page=1&limit=10`

---

## 🌍 Países

Gerenciamento completo de países.

### Operações

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| `GET` | `/country` | Listar países com paginação |
| `GET` | `/country/:id` | Buscar país por ID |
| `POST` | `/country` | Criar novo país |
| `PATCH` | `/country/:id` | Atualizar país |
| `DELETE` | `/country/:id` | Deletar país |

### Filtros e Paginação

- 🔍 **Filtrar por nome** - `?search=Brasil`
- 🌎 **Filtrar por continente** - `?continent_id=1`
- 📄 **Paginação** - `?page=1&limit=10`

---

## 🏙️ Cidades

Gerenciamento completo de cidades.

### Operações

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| `GET` | `/city` | Listar cidades com paginação |
| `GET` | `/city/:id` | Buscar cidade por ID |
| `POST` | `/city` | Criar nova cidade |
| `PATCH` | `/city/:id` | Atualizar cidade |
| `DELETE` | `/city/:id` | Deletar cidade |

### Filtros e Paginação

- 🔍 **Filtrar por nome** - `?search=São Paulo`
- 🌍 **Filtrar por país** - `?country_id=1`
- 📄 **Paginação** - `?page=1&limit=10`

---

## 👤 Usuários

Gerenciamento de usuários do sistema.

### Operações

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| `GET` | `/user` | Listar usuários |
| `GET` | `/user/:id` | Buscar usuário por ID |
| `POST` | `/user` | Criar novo usuário |
| `PATCH` | `/user/:id` | Atualizar usuário |
| `DELETE` | `/user/:id` | Deletar usuário |

---

## 📋 Convenções Gerais

### Status de Resposta

- ✅ `200 OK` - Requisição bem-sucedida
- ✅ `201 Created` - Recurso criado com sucesso
- ⚠️ `400 Bad Request` - Dados inválidos
- ❌ `404 Not Found` - Recurso não encontrado
- ❌ `500 Internal Server Error` - Erro no servidor

### Formato de Resposta

```json
{
  "status": 200,
  "data": [],
  "message": "Operação realizada com sucesso"
}
```

### Paginação Padrão

```json
{
  "data": [],
  "total": 100,
  "page": 1,
  "limit": 10,
  "pages": 10
}
```

---

## 🔗 Swagger

Acesse a documentação interativa das APIs em:

```
http://localhost:3000/api/docs
```

---

## 📝 Notas

- Todas as rotas retornam dados em **JSON**
- Utilize **paginação** em listagens para melhor performance
- **Filtros** podem ser combinados na mesma requisição
- Consulte o arquivo [`conceitos_basicos.md`](./conceitos_basicos.md) para entender como criar novas rotas

