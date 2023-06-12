import { createZodDto } from 'nestjs-zod';
import { z } from 'nestjs-zod/z';

export const CreateTaskUserSchema = z.object({
  title: z.string(),
  description: z.string(),
  priority: z.enum(['MEDIA', 'BAIXA', 'ALTA']),
  status: z.enum(['PENDENTE', 'ANDAMENTO', 'CONCLUIDA']),
  startAt: z.string().transform((item) => new Date(item)),
  endAt: z.string().transform((item) => new Date(item)),
});
// '2023-12-24 00:00'

export class CreateTaskUserSchemaDTO extends createZodDto(
  CreateTaskUserSchema,
) {}
