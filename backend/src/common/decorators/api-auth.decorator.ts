import {
  applyDecorators,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiUnauthorizedResponse,
  ApiInternalServerErrorResponse,
} from '@nestjs/swagger';

export function ApiAuth() {
  return applyDecorators(
    ApiBearerAuth(),
    ApiUnauthorizedResponse({
      description: 'Unauthorized',
      type: UnauthorizedException,
      example: {
        statusCode: 401,
        message: 'Unauthorized',
      },
    }),
    ApiInternalServerErrorResponse({
      description: 'Internal Server Error',
      type: InternalServerErrorException,
      example: {
        statusCode: 500,
        message: 'Internal Server Error',
      },
    }),
  );
}
