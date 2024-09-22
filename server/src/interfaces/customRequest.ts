import { Request } from 'express';
import { CustomJwtPayload } from './jwtPayload';

export interface CustomRequest extends Request {
  user?: CustomJwtPayload;
}
