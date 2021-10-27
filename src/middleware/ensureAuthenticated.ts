import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

export function ensureAuthenticated(request: Request, response: Response, next: NextFunction) {
  const authToken = request.headers.authorization;

  if (!authToken) {
    return response.status(401).json({message: 'Token not provided'});
  }

  const [, token] = authToken.split(' ');

  try {
    verify(token, 'bc93954c-45dd-41fe-9f2f-6f74d9b5c8e8')

    return next();
  } catch (error) {
    return response.status(401).json({message: 'Invalid token'});
  }
}