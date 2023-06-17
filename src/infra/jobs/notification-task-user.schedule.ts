import { Inject, Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { ITaskUserRepository } from '../../modules/tasks/repositories/task-user.repository';
import { ClientProxy } from '@nestjs/microservices';

type MessageDTO = {
  email: string;
  startAt: Date;
  endAt: Date;
  name: string;
  title: string;
  description: string;
};

@Injectable()
export class NotificationTaskUserSchedule {
  constructor(
    private taskRepository: ITaskUserRepository,
    @Inject('NOTIFICATION') private readonly notificationClient: ClientProxy,
  ) {}

  @Cron(CronExpression.EVERY_12_HOURS)
  async getAllTasksDay() {
    const allTasks = await this.taskRepository.findAllStartDay();

    console.log(' === NOTIFICANDO === ');

    if (allTasks) {
      allTasks.forEach((task) => {
        const message: MessageDTO = {
          name: task.user.name,
          description: task.task.description,
          title: task.task.title,
          email: task.user.email,
          endAt: task.task.endAt,
          startAt: task.task.startAt,
        };
        this.notificationClient.emit('task_notification', message);
      });
    }
  }
}
