import { getRepository, Repository } from 'typeorm';
import ICreateUserDTO from '../../dtos/ICreateUserDTO';
import User from '../../entities/user';
import IUsersRepository from '../IUsersRepository';

export default class UsersRepository implements IUsersRepository {
  private repository: Repository<User>

  constructor() {
    this.repository = getRepository(User)
  }

  async create({name, email, password, id}: ICreateUserDTO): Promise<void> {
      const user = this.repository.create({
        name,
        email,
        password,
        id
      })

      await this.repository.save(user);
  }
  async findByEmail(email: string): Promise<User | undefined> {
    const user = await this.repository.findOne({ email })

    return user;
  }
  async findById(id: string): Promise<User | undefined> {
    const user = await this.repository.findOne(id)

    return user;
  }

}
