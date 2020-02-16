import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Task } from './interfaces/task.interface';
import { CreateTaskDto } from './dto/createTask.dto';
import { ConfigService } from 'src/config/config.service';


@Injectable()
export class TaskService {
    constructor(@InjectModel('Task') private readonly taskModel: Model<Task>,
        private configService: ConfigService) { }

    async create(createTaskDto: CreateTaskDto): Promise<Task> {
        const createdCat = new this.taskModel(createTaskDto);
        return createdCat.save();
    }

    async getAll(): Promise<Task[]> {
        console.log('config server ===> ', this.configService.hello());
        return this.taskModel.find().exec();
    }

    hello(): string {
        return this.configService.hello();
    }

    root(roles: string[]): string {
        console.log(roles);
        return "user role";
    }

}
