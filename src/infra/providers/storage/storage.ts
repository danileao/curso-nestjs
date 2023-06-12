import { FileDTO } from '../../../modules/users/dto/user.dto';

export abstract class IStorage {
  abstract upload(file: FileDTO, folder: string): Promise<any>;
}
