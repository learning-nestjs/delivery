import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { TaskService } from './task.service';
import { Task } from './interfaces/task.interface';
import { CreateTaskDto } from './dto/createTask.dto';
import { Roles } from 'src/auth/roles.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { AuthGuard } from '@nestjs/passport';
import { ACGuard, UseRoles } from 'nest-access-control';
import { UserRoles } from '../auth/user.roles.decorator';


@UseGuards(AuthGuard('jwt'), RolesGuard)
@Controller('tasks')
export class TaskController {
    constructor(private taskService: TaskService) { }


    @Get()
    @Roles('basic')
    get(): Promise<Task[]> {
        return this.taskService.getAll();
    }

    @UseGuards(ACGuard)
    @UseRoles({
        resource: 'video',
        action: 'read',
        possession: 'any',
    })
    @Get('roles')
    // @Roles('basic')
    root(@UserRoles() userRoles: any): string {
        return this.taskService.root(userRoles);
    }

    @Post()
    @Roles('basic')
    create(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
        return this.taskService.create(createTaskDto);
    }

}
