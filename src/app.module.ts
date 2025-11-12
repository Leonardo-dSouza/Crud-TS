import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ItemsModule } from './items/items.module';
import { UsersModule } from './users/users.module';
import { CountriesModule } from './countries/countries.module';
import { ContinentsModule } from './continents/continents.module';
import { CitiesModule } from './cities/cities.module';
import { ContinentsModule } from './continents/continents.module';
import { CitiesModule } from './cities/cities.module';
import { CountriesModule } from './countries/countries.module';

@Module({
  imports: [ItemsModule, UsersModule, CountriesModule, ContinentsModule, CitiesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
