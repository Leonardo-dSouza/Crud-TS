import { ApiProperty } from "@nestjs/swagger";

export class CreateCityDto {

    @ApiProperty({
        example: 'São Paulo',
        description: 'The name of the city',
        type: 'string',
        required: true
    })
    name: string;

    @ApiProperty({
        example: '12300000',
        description: 'The population of the city',
        type: 'number',
        required: true
    })
    population: number;

    @ApiProperty({
        example: '12312.12313',
        type: 'number',
        required: true
    })
    latitude: number;

    @ApiProperty({
        example: '321321.321321',
        type: 'number',
        required: true
    })
    longitude: number;    

    @ApiProperty({
        example: '1',
        description: 'The ID of the country the city belongs to',
        type: 'number',
        required: true
    })
    countryId: number;

}
