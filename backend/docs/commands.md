# Comandos Úteis - Crud-TS Backend

## 🚀 Iniciando o Projeto

### Modo Desenvolvimento (com watch)
```bash
npm run start:dev
```
Inicia o servidor Nest com recompilação automática ao salvar arquivos. **Recomendado durante desenvolvimento.**

### Modo Produção
```bash
npm run start
```
Inicia o servidor a partir do build compilado em `dist/`.

### Build para Produção
```bash
npm run build
```
Compila o projeto TypeScript para JavaScript em `dist/`.

---

## 🗄️ Banco de Dados & Prisma

### Gerar Cliente Prisma
```bash
npx prisma generate
```
Regenera os tipos TypeScript do Prisma baseado no schema. Execute depois de alterar `prisma/schema.prisma`.

### Abrir Prisma Studio (UI para o banco)
```bash
npx prisma studio
```
ou
```bash
npm run db:studio
```
Interface visual para explorar e editar dados do banco sem SQL.

### Executar Migrations
```bash
npx prisma migrate dev
```
ou
```bash
npm run db:migrate
```
Cria e aplica migrações do banco de dados. Pergunta pelo nome da migração.

### Push Schema para Banco (sem migrations)
```bash
npx prisma db push
```
ou
```bash
npm run db:push
```
Sincroniza o schema Prisma diretamente com o banco (útil em dev, não recomendado em prod).

### Resetar Banco de Dados
```bash
npx prisma migrate reset
```
ou
```bash
npm run db:reset
```
⚠️ **Cuidado!** Deleta todos os dados e reaplica as migrations do zero.

### Seed do Banco
```bash
npx prisma db seed
```
ou
```bash
npm run db:seed
```
Popula o banco com dados iniciais usando `prisma/seed.ts`.

---

## 🧪 Testes

### Executar Testes Unitários
```bash
npm run test
```

### Testes em Modo Watch
```bash
npm run test:watch
```
Reexecuta os testes automaticamente ao salvar.

### Cobertura de Testes
```bash
npm run test:cov
```

### Testes E2E
```bash
npm run test:e2e
```

---

## 📝 Linting & Formatação

### Lint com ESLint (auto-fix)
```bash
npm run lint
```
Verifica e corrige automaticamente problemas de código.

### Formato com Prettier
```bash
npm run format
```
Formata todo o código TypeScript conforme padrão.

---

## 🔗 Rotas Disponíveis

| Recurso | Método | Endpoint |
|---------|--------|----------|
| **Continentes** | POST | `/continent` |
| | GET | `/continent` |
| | GET | `/continent/:id` |
| | PATCH | `/continent/:id` |
| | DELETE | `/continent/:id` |
| **Países** | POST | `/country` |
| | GET | `/country` |
| | GET | `/country/:id` |
| | PATCH | `/country/:id` |
| | DELETE | `/country/:id` |
| **Cidades** | POST | `/city` |
| | GET | `/city` |
| | GET | `/city/:id` |
| | PATCH | `/city/:id` |
| | DELETE | `/city/:id` |
| **Usuários** | POST | `/user` |
| | GET | `/user` |
| | GET | `/user/:id` |
| | PATCH | `/user/:id` |
| | DELETE | `/user/:id` |

---

## 📚 Variáveis de Ambiente

Configure no arquivo `.env`:
```env
DATABASE_URL="postgresql://postgres:kali@localhost:5432/geowiki?schema=public"
```

---

## 💡 Dicas Rápidas

- **Servidor rodando?** Acesse `http://localhost:3000` no navegador
- **Swagger/Docs?** Acesse `http://localhost:3000/api/docs` (se configurado)
- **Prisma Studio:** Execute `npm run db:studio` para interface visual do banco
- **Hot reload:** Modo `start:dev` recarrega automaticamente ao salvar arquivos

