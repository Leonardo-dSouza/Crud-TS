import { PartialType } from '@nestjs/mapped-types';
import { CreateCountryDto } from './create-country.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateCountryDto extends PartialType(CreateCountryDto) {

    @ApiProperty({ example: 'Brasil', required: false })
    name?: string;

    @ApiProperty({ example: 'Portugues', required: false })
    language?: string;

    @ApiProperty({ example: 'Reais', required: false })
    coin?: string;

    @ApiProperty({ example: 'BR', required: false })
    flag?: string;

    @ApiProperty({ example: '20000', required: false })
    population?: number;

    @ApiProperty({ example: '1', required: false })
    continentId?: number;


}
