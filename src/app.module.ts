import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TaskModule } from './task/task.module';
import { MongooseModule } from '@nestjs/mongoose';
import { TaskService } from './task/task.service';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './auth/roles.guard';
import { roles } from './app.role';
import { AccessControlModule } from 'nest-access-control';
import { CartModule } from './cart/cart.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb://root:mypassword123456783334@localhost:27018/chanthem?authSource=admin',
      { useNewUrlParser: true }
    ),
    TaskModule,
    AuthModule,
    AccessControlModule.forRoles(roles),
    CartModule
  ],
  providers: []
})
export class AppModule { }
