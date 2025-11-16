import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CountryModule } from './country/country.module';
import { ContinentModule } from './continent/continent.module';
import { CityModule } from './city/city.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [CityModule, ContinentModule, CountryModule, UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
