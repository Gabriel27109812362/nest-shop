import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { configService } from './config/config.service';
import { UserController } from './controllers/user/user.controller';
import { UserService } from './services/user/user.service';
import { ClientService } from './services/client/client.service';
import { ClientController } from './controllers/client/client.controller';

@Module({
  imports: [
    TypeOrmModule.forRoot(configService.getTypeOrmConfig()),
  ],
  controllers: [AppController, UserController, ClientController],
  providers: [AppService, UserService, ClientService],
})
export class AppModule {
}
