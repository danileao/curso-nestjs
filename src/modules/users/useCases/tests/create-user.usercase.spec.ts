import { Test } from '@nestjs/testing';
import { CreateUserUseCase } from '../create-user.usecase';
import { CreateUserDTO } from '../../dto/user.dto';
import { IUserRepository } from '../../repositories/user.repository';
import { UserInMemoryRepository } from '../../repositories/in-memory/user-in-memory.repository';

describe('CreateUserUseCase', () => {
  let createUserUseCase: CreateUserUseCase;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        CreateUserUseCase,
        {
          provide: IUserRepository,
          useClass: UserInMemoryRepository,
        },
      ],
    }).compile();

    createUserUseCase = moduleRef.get<CreateUserUseCase>(CreateUserUseCase);
  });

  it('Should be able to create a new user', async () => {
    const data: CreateUserDTO = {
      email: 'email@test.com',
      name: 'Name test',
      password: '1234',
      username: 'username_test',
    };

    const result = await createUserUseCase.execute(data);
    expect(result).toHaveProperty('id');
    expect(result.password).not.toEqual(data.password);
  });

  it('Should not be able to create a new user if username already exists', async () => {
    const data: CreateUserDTO = {
      email: 'username_already_exists@test.com',
      name: 'Name test',
      password: '1234',
      username: 'username_already_exists',
    };

    await createUserUseCase.execute(data);
    expect(createUserUseCase.execute(data)).rejects.toThrowError();
  });
});
