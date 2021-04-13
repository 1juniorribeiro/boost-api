import { Request, Response } from 'express';
import { container } from 'tsyringe';
import CreateUserUseCase from './createUserUseCase';

export default class CreateUserControler {
  async handle(request: Request, response: Response): Promise<Response> {
    const { name, email, password } = request.body

    const createUserUseCase = container.resolve(CreateUserUseCase)

    await createUserUseCase.execute({
      name,
      email,
      password
    })

    return response.status(201).send();
  }
}
