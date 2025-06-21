import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class FindAllTaskRequestDto {
  @ApiPropertyOptional({
    description: 'The ID of the owner of the tasks',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsString()
  @IsOptional()
  ownerId?: string;
}
