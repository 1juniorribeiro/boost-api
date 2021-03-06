import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';
import AppError from '../errors/AppError';
import UsersRepository from '../modules/accounts/repositories/implementations/UsersRepository';

interface IPayLoad {
  sub: string;
}

export default async function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction,
): Promise<void> {
  const authHeader = request.headers.authorization;

  if(!authHeader) {
    throw new AppError('token missing', 401)
  }

  const [, token] = authHeader.split(' ');

  try {
    const { sub: user_id } = verify(
      token,
      'a299c68d8a7193f3f272cdca49d0405c',
    ) as IPayLoad;

    const usersRepository = new UsersRepository();
    const user = await usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('User does not exists', 401);
    }

    request.user = { id: user_id};

    next();
  } catch {
    throw new AppError('invalid token', 401);
  }
}
