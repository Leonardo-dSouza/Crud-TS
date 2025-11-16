import { Injectable } from '@nestjs/common';
import { CreateContinentDto } from './dto/create-continent.dto';
import { UpdateContinentDto } from './dto/update-continent.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ContinentService {
  constructor(private prisma: PrismaService) {}
  create(createContinentDto: CreateContinentDto) {
    return this.prisma.continent.create({
      data: {
        con_name: createContinentDto.name,
        con_description: createContinentDto.description,
      },
    });
  }

  findAll() {
    return this.prisma.continent.findMany();
  }

  findOne(id: number) {
    return this.prisma.continent.findUnique({
      where: { con_id: id },
    });
  }

  update(id: number, updateContinentDto: UpdateContinentDto) {
    return this.prisma.continent.update({
      where: { con_id: id },
      data: {
        con_name: updateContinentDto.name,
        con_description: updateContinentDto.description,
      },
    });
  }

  remove(id: number) {
    return `This action removes a #${id} continent`;
  }
}
