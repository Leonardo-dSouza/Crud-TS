import { PartialType } from '@nestjs/mapped-types';
import { CreateContinentDto } from './create-continent.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, MaxLength, MinLength } from 'class-validator';

export class UpdateContinentDto extends PartialType(CreateContinentDto) {
  @ApiProperty({ example: 'Asia', required: false })
  @IsOptional()
  @IsString({ message: 'O nome deve ser uma string' })
  @MinLength(3, { message: 'O nome deve ter no mínimo 3 caracteres' })
  @MaxLength(100, { message: 'O nome deve ter no máximo 100 caracteres' })
  name?: string;

  @ApiProperty({ example: 'O maior continente do mundo', required: false })
  @IsOptional()
  @IsString({ message: 'A descrição deve ser uma string' })
  @MinLength(10, { message: 'A descrição deve ter no mínimo 10 caracteres' })
  @MaxLength(500, { message: 'A descrição deve ter no máximo 500 caracteres' })
  description?: string;
}