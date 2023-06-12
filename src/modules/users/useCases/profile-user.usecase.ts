import { Injectable } from '@nestjs/common';
import { IUserRepository } from '../repositories/user.repository';

@Injectable()
export class ProfileUserUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute(id: string) {
    return this.userRepository.findById(id);
  }
}
