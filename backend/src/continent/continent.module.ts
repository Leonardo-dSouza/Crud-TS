import { Module } from '@nestjs/common';
import { ContinentService } from './continent.service';
import { ContinentController } from './continent.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [ContinentController],
  providers: [ContinentService],
  imports: [PrismaModule]
})
export class ContinentModule {}
