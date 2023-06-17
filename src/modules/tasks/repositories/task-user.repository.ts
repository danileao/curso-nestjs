import {
  TaskUserNotificationDTO,
  TaskUserRequestDTO,
  TaskUserResponseDTO,
} from '../dto/task-user.dto';

export abstract class ITaskUserRepository {
  abstract save(data: TaskUserRequestDTO): Promise<TaskUserResponseDTO>;
  abstract findAllStartDay(): Promise<TaskUserNotificationDTO[] | null>;
}
