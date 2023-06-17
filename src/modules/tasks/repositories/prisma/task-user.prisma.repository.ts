import { PrismaService } from 'src/infra/database/prisma.service';
import {
  TaskUserNotificationDTO,
  TaskUserRequestDTO,
  TaskUserResponseDTO,
} from '../../dto/task-user.dto';
import { ITaskUserRepository } from '../task-user.repository';
import { Injectable } from '@nestjs/common';
import { startOfDay, endOfDay } from '../../../../infra/utils/date';

@Injectable()
export class TaskUserPrismaRepository implements ITaskUserRepository {
  constructor(private prisma: PrismaService) {}

  async save(data: TaskUserRequestDTO): Promise<TaskUserResponseDTO> {
    return this.prisma.taskUser.create({
      data: {
        task: {
          create: {
            description: data.description,
            endAt: data.endAt,
            startAt: data.startAt,
            title: data.title,
            priority: data.priority,
            status: data.status,
          },
        },
        user: {
          connect: {
            id: data.userId,
          },
        },
      },
    });
  }

  // 16-06-2023 00:00:00
  // 16-06-2023 23:59:59

  async findAllStartDay(): Promise<TaskUserNotificationDTO[] | null> {
    const allTasks = await this.prisma.taskUser.findMany({
      where: {
        AND: [
          {
            task: {
              startAt: {
                gte: startOfDay(),
                lte: endOfDay(),
              },
            },
          },
        ],
      },
      include: {
        task: {
          select: {
            startAt: true,
            endAt: true,
            title: true,
            description: true,
          },
        },
        user: true,
      },
    });
    return allTasks;
  }
}
