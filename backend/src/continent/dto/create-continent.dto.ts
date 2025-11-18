import { ApiOperation, ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateContinentDto {
    // @IsString({ message: 'O nome deve ser uma string' })

    @IsNotEmpty({
        message: 'O nome não pode estar vazio'
    })

    @ApiProperty({
        example: 'Asia',
        description: 'Um nome de um continente',
        type: 'string',
        required: true
    })
    name: string;

    @IsNotEmpty({
        message: 'A descrição não pode estar vazia'
    })
    
    @ApiProperty({
        example: 'O maior continente do mundo',
        description: 'Uma descrição do continente',
        type: 'string',
        required: true
    })
    description: string;
}
