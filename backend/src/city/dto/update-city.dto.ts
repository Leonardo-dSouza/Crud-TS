import { PartialType } from '@nestjs/mapped-types';
import { CreateCityDto } from './create-city.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateCityDto extends PartialType(CreateCityDto) {
    @ApiProperty({
        example: 'São Paulo',
        description: 'The name of the city',
        type: 'string',
        required: false
    })
    name?: string;

    @ApiProperty({
        example: '12300000',
        description: 'The population of the city',
        type: 'number',
        required: false
    })
    population?: number;

    @ApiProperty({
        example: '12312.12313',
        type: 'number',
        required: false
    })
    latitude?: number;

    @ApiProperty({
        example: '321321.321321',
        type: 'number',
        required: false
    })
    longitude?: number;    

    @ApiProperty({
        example: '1',
        description: 'The ID of the country the city belongs to',
        type: 'number',
        required: false
    })
    countryId?: number;    
}
