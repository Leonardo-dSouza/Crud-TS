import { City } from "../../city/entities/city.entity";

export class Country {
    id: number;
    name: string;
    language: string;
    coin: string
    flag: string;
    population: number;
    
    continentId: number;
    continent: string;

    cities: City[];

    createdAt: Date;
    updatedAt: Date;
    
}
