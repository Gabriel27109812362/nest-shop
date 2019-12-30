import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { configService } from './config/config.service';
import { UserController } from './controllers/user/user.controller';
import { UserService } from './services/user/user.service';
import { ClientService } from './services/client/client.service';
import { ClientController } from './controllers/client/client.controller';
import { ClientAddressController } from './controllers/clientAddress/clientAddress.controller';
import { ClientAddressService } from './services/client-address/client-address.service';
import { EmployeeController } from './controllers/employee/employee.controller';
import { EmployeeAddressController } from './controllers/employeeAddress/employeeAddress.controller';
import { EmployeeAddressService } from './services/employee-address/employee-address.service';
import { EmployeeService } from './services/employee/employee.service';

@Module({
  imports: [
    TypeOrmModule.forRoot(configService.getTypeOrmConfig()),
  ],
  controllers: [AppController, UserController, ClientController, ClientAddressController, EmployeeController, EmployeeAddressController],
  providers: [AppService, UserService, ClientService, ClientAddressService, EmployeeAddressService, EmployeeService],
})
export class AppModule {
}
