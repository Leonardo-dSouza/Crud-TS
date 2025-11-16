import { City } from "../../city/entities/city.entity";

export class Continent {
    id: number;
    name: string
    description: string
    
    countries: City[];

    createdAt: Date;
    updatedAt: Date;
}
