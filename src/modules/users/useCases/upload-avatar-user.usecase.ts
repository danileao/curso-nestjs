import { Injectable } from '@nestjs/common';
import { AvatarDTO } from '../dto/user.dto';
import { IStorage } from '../../../infra/providers/storage/storage';
import { IUserRepository } from '../repositories/user.repository';
import { extname } from 'path';

@Injectable()
export class UploadAvatarUserUseCase {
  constructor(
    private storage: IStorage,
    private userRepository: IUserRepository,
  ) {}

  async execute(data: AvatarDTO) {
    const extFile = extname(data.file.originalname);
    const transformName = `${data.idUser}${extFile}`;
    /*
      originalname = avatar.png
      originalname = transformName (892349234789234923489234.png)
     */
    data.file.originalname = transformName;
    const file = await this.storage.upload(data.file, 'avatar');

    const pathAvatarUser = `avatar/${data.file.originalname}`;

    await this.userRepository.uploadAvatar(data.idUser, pathAvatarUser);

    return file;
  }
}
