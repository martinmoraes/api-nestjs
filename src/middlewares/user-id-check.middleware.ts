import { BadRequestException, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

export class UserIdCheckMIddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log('UserIdCheckMIddleware', 'antes');
    if (isNaN(Number(req.params.id)) || Number(req.params.id) <= 0) {
      throw new BadRequestException('Id inválido!');
    }

    console.log('UserIdCheckMIddleware', 'depois');

    next();
  }
}
