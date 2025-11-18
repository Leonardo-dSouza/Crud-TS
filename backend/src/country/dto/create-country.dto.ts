import { ApiProperty } from "@nestjs/swagger";

export class CreateCountryDto {

    @ApiProperty({
        example: 'Brazil',
        description: 'The name of the country',
        type: 'string',
        required: true
    })
    name: string;

    @ApiProperty({
        example: 'Portugues',
        description: '',
        type: 'string',
        required: true
    })
    language: string;

    @ApiProperty({
        example: 'Reais',
        description: '',
        type: 'string',
        required: true
    })
    coin: string;


    @ApiProperty({
        example: 'BR',
        description: '',
        type: 'string',
        required: true
    })
    flag: string;


    @ApiProperty({
        example: '20000000',
        description: '',
        type: 'number',
        required: true
    })
    population: number;


    @ApiProperty({
        example: '1',
        description: '',
        type: 'number',
        required: true
    })
    continentId: number;


}
