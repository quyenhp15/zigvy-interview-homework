import { TaskStatus } from '@/common/enums';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsDate,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateTaskRequestDto {
  @ApiProperty({
    description: 'The title of the task',
    example: 'Buy groceries',
  })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    description: 'The description of the task',
    example: 'Buy groceries for the week',
  })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiPropertyOptional({
    description: 'The due date of the task',
    example: '2021-01-01',
  })
  @IsDate()
  @IsOptional()
  dueDate?: Date;

  @ApiPropertyOptional({
    description: 'The status of the task',
    example: TaskStatus.TODO,
  })
  @IsEnum(TaskStatus)
  @IsOptional()
  status?: TaskStatus;

  @ApiPropertyOptional({
    description: 'The ID of the owner of the task',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsString()
  @IsOptional()
  ownerId?: string;
}
