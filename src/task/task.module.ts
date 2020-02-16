import { Module } from '@nestjs/common';
import { TaskController } from './task.controller';
import { TaskSchema } from './schemas/task.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { TaskService } from './task.service';
import { AuthModule } from 'src/auth/auth.module';
import { ConfigService } from 'src/config/config.service';
import { DevelopmentConfigService } from 'src/config/development.config';
import { ProductionConfigService } from 'src/config/production.config';

const configServiceProvider = {
  provide: ConfigService,
  useClass:
    process.env.NODE_ENV === 'development'
      ? DevelopmentConfigService
      : ProductionConfigService
};


// const connectionFactory = {
//   provide: 'CONNECTION',
//   useFactory: (optionsProvider: OptionsProvider) => {
//     const options = optionsProvider.get();
//     return new DatabaseConnection(options);
//   },
//   inject: [OptionsProvider],
// };


@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Task', schema: TaskSchema }]),
    AuthModule
  ],
  controllers: [TaskController],
  providers: [TaskService, configServiceProvider]
})
export class TaskModule { }
