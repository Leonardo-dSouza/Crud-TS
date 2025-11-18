import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ContinentService } from './continent.service';
import { CreateContinentDto } from './dto/create-continent.dto';
import { UpdateContinentDto } from './dto/update-continent.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

// Exemplos de uso de decorators do Swagger
// @ApiResponse({ status: 200, description: 'Successful operation.' })
// @ApiResponse({ status: 403, description: 'Forbidden.' })


@Controller('continent')
export class ContinentController {
  constructor(private readonly continentService: ContinentService) {}

  @Post()
  @ApiOperation({ summary: 'Criar um novo continente' })
  create(@Body() createContinentDto: CreateContinentDto) {
    return this.continentService.create(createContinentDto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todos os continentes' })
  findAll() {
    return this.continentService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obter um continente pelo ID' })
  findOne(@Param('id') id: string) {
    return this.continentService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualizar um continente pelo ID' })
  update(@Param('id') id: string, @Body() updateContinentDto: UpdateContinentDto) {
    return this.continentService.update(+id, updateContinentDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remover um continente pelo ID' })
  remove(@Param('id') id: string) {
    return this.continentService.remove(+id);
  }
}
