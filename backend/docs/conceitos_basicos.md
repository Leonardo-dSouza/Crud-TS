# Conceitos Básicos - Criação de Rotas no NestJS

Este documento descreve o padrão utilizado neste projeto para criar uma nova rota/recurso no NestJS com Prisma e TypeScript.

## Estrutura de Pastas

Cada recurso (rota) segue a seguinte estrutura de pastas:

```
src/
└── [recurso]/
    ├── [recurso].controller.ts      # Define as rotas e manipuladores HTTP
    ├── [recurso].service.ts         # Lógica de negócio e acesso ao banco
    ├── [recurso].module.ts          # Módulo que agrupa controller e service
    ├── dto/
    │   ├── create-[recurso].dto.ts  # DTO para criação
    │   └── update-[recurso].dto.ts  # DTO para atualização
    └── entities/
        └── [recurso].entity.ts      # Tipo TypeScript do recurso
```

## Passo a Passo para Criar uma Nova Rota

### 1. Criar a Entity (Tipo TypeScript)

Arquivo: `src/[recurso]/entities/[recurso].entity.ts`

Representa a estrutura de dados do seu recurso com os tipos TypeScript:

```typescript
export class User {
    id: number;
    email: string;
    password: string;
    name: string;
    role: string;

    createdAt: Date;
    updatedAt: Date;
}
```

### 2. Criar os DTOs (Data Transfer Objects)

#### Arquivo: `src/[recurso]/dto/create-[recurso].dto.ts`

DTO para criação - contém os campos necessários para criar um novo registro:

```typescript
import { ApiProperty } from "@nestjs/swagger";

export class CreateUserDto {
    @ApiProperty()
    readonly name: string;

    @ApiProperty()
    readonly email: string;

    @ApiProperty()
    readonly password: string;

    @ApiProperty()
    readonly role: string;
}
```

#### Arquivo: `src/[recurso]/dto/update-[recurso].dto.ts`

DTO para atualização - geralmente importa e estende o DTO de criação:

```typescript
import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {}
```

### 3. Criar o Service (Lógica de Negócio)

Arquivo: `src/[recurso]/[recurso].service.ts`

Contém a lógica de negócio e interage com o banco de dados via Prisma:

```typescript
import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  // CREATE - Criar um novo recurso
  create(createUserDto: CreateUserDto) {
    return this.prisma.user.create({
      data: createUserDto,
    });
  }

  // READ ALL - Buscar todos os recursos
  findAll() {
    return this.prisma.user.findMany();
  }

  // READ ONE - Buscar um recurso por ID
  findOne(id: number) {
    return this.prisma.user.findUnique({
      where: { use_id: id },
    });
  }

  // UPDATE - Atualizar um recurso
  update(id: number, updateUserDto: UpdateUserDto) {
    return this.prisma.user.update({
      where: { use_id: id },
      data: updateUserDto,
    });
  }

  // DELETE - Deletar um recurso
  remove(id: number) {
    return this.prisma.user.delete({
      where: { use_id: id },
    });
  }
}
```

### 4. Criar o Controller (Rotas HTTP)

Arquivo: `src/[recurso]/[recurso].controller.ts`

Define as rotas HTTP e os manipuladores (handlers) para cada operação CRUD:

```typescript
import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('user')  // Agrupa as rotas no Swagger
@Controller('user')  // Define o prefixo da rota (ex: /user)
export class UserController {
  constructor(private readonly userService: UserService) {}

  // POST /user - Criar um novo recurso
  @Post()
  @ApiOperation({ summary: 'Create user' })
  @ApiResponse({ status: 201, description: 'The user has been successfully created.' })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  // GET /user - Buscar todos os recursos
  @Get()
  @ApiOperation({ summary: 'Get all users' })
  findAll() {
    return this.userService.findAll();
  }

  // GET /user/:id - Buscar um recurso por ID
  @Get(':id')
  @ApiOperation({ summary: 'Get a user by ID' })
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  // PATCH /user/:id - Atualizar um recurso
  @Patch(':id')
  @ApiOperation({ summary: 'Update a user' })
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  // DELETE /user/:id - Deletar um recurso
  @Delete(':id')
  @ApiOperation({ summary: 'Delete a user' })
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
```

### 5. Criar o Module (Agregador)

Arquivo: `src/[recurso]/[recurso].module.ts`

Agrupa o controller, service e as dependências do módulo:

```typescript
import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  controllers: [UserController],  // Registra o controller
  providers: [UserService],       // Registra o service como provider
  imports: [PrismaModule],        // Importa módulos necessários
})
export class UserModule {}
```

### 6. Registrar o Module no App Module

Arquivo: `src/app.module.ts`

Importe e registre o novo módulo no módulo principal da aplicação:

```typescript
import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { CityModule } from './city/city.module';
import { CountryModule } from './country/country.module';
import { ContinentModule } from './continent/continent.module';

@Module({
  imports: [
    UserModule,
    CityModule,
    CountryModule,
    ContinentModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
```

## Resumo das Operações CRUD

| Operação | Método HTTP | Rota | Função |
|----------|------------|------|--------|
| **CREATE** | POST | `/user` | Criar um novo recurso |
| **READ ALL** | GET | `/user` | Buscar todos os recursos |
| **READ ONE** | GET | `/user/:id` | Buscar um recurso específico |
| **UPDATE** | PATCH | `/user/:id` | Atualizar um recurso |
| **DELETE** | DELETE | `/user/:id` | Deletar um recurso |

## Decoradores Importantes

- `@Controller(path)` - Define o prefixo da rota
- `@Get()` / `@Post()` / `@Patch()` / `@Delete()` - Define o método HTTP
- `@Body()` - Extrai o corpo da requisição
- `@Param(name)` - Extrai parâmetros da URL
- `@Injectable()` - Marca a classe como provider injetável
- `@Module()` - Marca a classe como módulo NestJS
- `@ApiTags()` - Agrupa rotas no Swagger
- `@ApiOperation()` - Descreve a operação no Swagger
- `@ApiResponse()` - Documenta as respostas no Swagger

## Integração com Prisma

O projeto utiliza **Prisma** como ORM. O banco de dados é definido em `prisma/schema.prisma` e acessado através do `PrismaService`.

Exemplo de operações Prisma no service:

```typescript
// Criar
this.prisma.user.create({ data: {...} })

// Ler todos
this.prisma.user.findMany()

// Ler um
this.prisma.user.findUnique({ where: { id: 1 } })

// Atualizar
this.prisma.user.update({ where: { id: 1 }, data: {...} })

// Deletar
this.prisma.user.delete({ where: { id: 1 } })
```

## Padrão de Nomenclatura

- **Pastas**: `[recurso]` em singular e minúsculo (ex: `user`, `city`, `country`)
- **Arquivos**: `[recurso].controller.ts`, `[recurso].service.ts`, `[recurso].module.ts`
- **Classes**: `UserController`, `UserService`, `UserModule` (PascalCase)
- **DTOs**: `CreateUserDto`, `UpdateUserDto` (PascalCase)
- **Entities**: `User` (PascalCase)
- **Rotas**: `/user`, `/city`, `/country` (lowercase, sem plurais)

## Próximos Passos

1. Defina os campos do seu recurso no schema Prisma
2. Execute `npx prisma migrate dev` para criar as migrations
3. Crie a entity TypeScript
4. Crie os DTOs (create e update)
5. Implemente o service com lógica de negócio
6. Crie o controller com as rotas
7. Crie o module
8. Registre o module no `app.module.ts`
9. Teste as rotas via Swagger em `/api/docs`
