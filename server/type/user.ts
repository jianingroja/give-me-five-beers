import { Request } from 'express';

export interface TokenWithId {
  id: string;
}

export interface RequestWithUser extends Request {
  user: any;
}
