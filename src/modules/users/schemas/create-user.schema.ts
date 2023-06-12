import { createZodDto } from 'nestjs-zod';
import { z } from 'nestjs-zod/z';

export const CreateUserSchema = z.object({
  name: z.string({
    required_error: 'Name is required',
  }),
  password: z.string({
    required_error: 'Password is required',
  }),
  username: z.string({
    required_error: 'Username is required',
  }),
  email: z.string().email(),
});

export class CreateUserSchemaDTO extends createZodDto(CreateUserSchema) {}

export const CreateUserResponseSchemaDTO = CreateUserSchema.omit({
  password: true,
});

export type CreateUserResponseSchemaDTO = z.infer<
  typeof CreateUserResponseSchemaDTO
>;
