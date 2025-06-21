import { TaskStatus } from '@/common/enums';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTaskResponseDto {
  @ApiProperty({
    description: 'The ID of the created task',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  id: string;

  @ApiProperty({
    description: 'The title of the created task',
    example: 'Buy groceries',
  })
  title: string;

  @ApiProperty({
    description: 'The description of the created task',
    example: 'Buy groceries for the week',
  })
  description: string;

  @ApiProperty({
    description: 'The status of the created task',
    example: TaskStatus.TODO,
  })
  status: TaskStatus;

  @ApiProperty({
    description: 'The due date of the created task',
    example: '2021-01-01',
  })
  dueDate: Date;

  @ApiProperty({
    description: 'The owner of the created task',
    example: {
      id: '123e4567-e89b-12d3-a456-426614174000',
      email: 'test@test.com',
    },
  })
  owner: {
    id: string;
    email: string;
  };
}
