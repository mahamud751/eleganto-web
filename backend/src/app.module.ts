import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaService } from './prisma.service';
import { ProductsController } from './products.controller';
import { OrdersController } from './orders.controller';
import { DashboardController } from './dashboard.controller';
import { StoreService } from './store.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersController } from './users.controller';
import { BannersController } from './banners.controller';
import { SettingsController } from './settings.controller';
import { UploadsController } from './uploads.controller';

@Module({ imports: [ConfigModule.forRoot({ isGlobal: true })], controllers: [ProductsController, OrdersController, DashboardController, AuthController, UsersController, BannersController, SettingsController, UploadsController], providers: [PrismaService, StoreService, AuthService] })
export class AppModule {}
