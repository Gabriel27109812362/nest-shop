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
import { StoreHouseController } from './controllers/storeHouse/storeHouse.controller';
import { StoreHouseService } from './services/store-house/store-house.service';
import { ProducerController } from './controllers/producer/producer.controller';
import { ProducerService } from './services/producer/producer.service';
import { CategoryController } from './controllers/category/category.controller';
import { CategoryService } from './services/category/category.service';
import { VatController } from './controllers/vat/vat.controller';
import { VatService } from './services/vat/vat.service';
import { ProductController } from './controllers/product/product.controller';
import { ProductService } from './services/product/product.service';
import { OrderController } from './controllers/order/order.controller';
import { OrderService } from './services/order/order.service';
import { PaymentsController } from './controllers/payments/payments.controller';
import { PaymentsService } from './services/payments/payments.service';

@Module({
  imports: [
    TypeOrmModule.forRoot(configService.getTypeOrmConfig()),
  ],
  controllers: [
    AppController, UserController, ClientController,
    ClientAddressController, EmployeeController,
    EmployeeAddressController, StoreHouseController,
    ProducerController, CategoryController, VatController,
    ProductController, OrderController, PaymentsController,
  ],
  providers: [
    AppService, UserService, ClientService,
    ClientAddressService, EmployeeAddressService, EmployeeService,
    StoreHouseService, ProducerService, CategoryService,
    VatService, ProductService, OrderService, PaymentsService,
  ],
})
export class AppModule {
}
