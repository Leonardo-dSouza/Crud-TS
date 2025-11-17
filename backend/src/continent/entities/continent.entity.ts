import { Country } from "src/country/entities/country.entity";

export class Continent {
    id: number;
    name: string
    description: string
    
    countries: Country[];

    createdAt: Date;
    updatedAt: Date;
}
