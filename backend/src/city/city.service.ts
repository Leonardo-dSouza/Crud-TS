import { Injectable } from '@nestjs/common';
import { CreateCityDto } from './dto/create-city.dto';
import { UpdateCityDto } from './dto/update-city.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CityService {
  constructor(private prisma: PrismaService) { }

  create(createCityDto: CreateCityDto) {
    return this.prisma.city.create({
      data: {
        cit_name: createCityDto.name,
        cit_population: createCityDto.population,
        cit_latitude: createCityDto.latitude,
        cit_longitude: createCityDto.longitude,
        cou_id: createCityDto.countryId,
      }
    });
  }

  findAll() {
    return this.prisma.city.findMany();
  }

  findOne(id: number) {
    return this.prisma.city.findUnique({
      where: { cit_id: id },
    });
  }

  update(id: number, updateCityDto: UpdateCityDto) {
    return this.prisma.city.update({
      where: { cit_id: id },
      data: {
        cit_name: updateCityDto.name,
        cit_population: updateCityDto.population,
        cit_latitude: updateCityDto.latitude,
        cit_longitude: updateCityDto.longitude,
        cou_id: updateCityDto.countryId,
      }
    });
  }

  remove(id: number) {
    return this.prisma.city.delete({
      where: { cit_id: id },
    });
  }
}
