import { Module } from '@nestjs/common';
import { UserModule } from './modules/users/user.module';
import { LoginModule } from './modules/login/login.module';
import { APP_PIPE } from '@nestjs/core';
import { ZodValidationPipe } from 'nestjs-zod';
import { TaskUserModule } from './modules/tasks/task-user.module';
import { ScheduleTaskModule } from './infra/jobs/schedule.module';
import { PrismaModule } from './infra/database/prisma.module';

@Module({
  imports: [
    PrismaModule,
    UserModule,
    LoginModule,
    TaskUserModule,
    ScheduleTaskModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_PIPE,
      useClass: ZodValidationPipe,
    },
  ],
})
export class AppModule {}
