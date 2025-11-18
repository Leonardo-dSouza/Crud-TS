import { Injectable } from '@nestjs/common';
import { CreateCountryDto } from './dto/create-country.dto';
import { UpdateCountryDto } from './dto/update-country.dto';
import { PrismaService } from '../prisma/prisma.service';


@Injectable()
export class CountryService {
  constructor(private prisma: PrismaService) {}
  

  create(createCountryDto: CreateCountryDto) {
    return this.prisma.country.create({
      data: {
        cou_name: createCountryDto.name,
        cou_language: createCountryDto.language,
        cou_coin: createCountryDto.coin,
        cou_flag: createCountryDto.flag,
        cou_population: createCountryDto.population,
        con_id: createCountryDto.continentId
      },
    });
  }

  findAll() {
    return this.prisma.country.findMany();
  }

  findOne(id: number) {
    return this.prisma.country.findUnique({
      where: { cou_id: id },
    });
  }

  update(id: number, updateCountryDto: UpdateCountryDto) {
    return this.prisma.country.update({
      where: { cou_id: id },
      data: {
        cou_name: updateCountryDto.name,
        cou_language: updateCountryDto.language,
        cou_coin: updateCountryDto.coin,
        cou_flag: updateCountryDto.flag,
        cou_population: updateCountryDto.population,
        con_id: updateCountryDto.continentId
      },
    }); 
  }

  remove(id: number) {
    return this.prisma.country.delete({
      where: { cou_id: id },
    });
  }
}
