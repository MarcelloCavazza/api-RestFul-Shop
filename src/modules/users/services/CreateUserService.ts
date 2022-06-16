import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import User from '../typeorm/entities/Users';
import UsersRepository from '../typeorm/repositories/UsersRepository';

interface IRequest {
  name: string;
  email: string;
  password: string;
  avatar: string;
}

class CreateUserService {
  public async execute({
    name,
    email,
    password,
    avatar,
  }: IRequest): Promise<User> {
    const usersRepository = getCustomRepository(UsersRepository);
    const emailExists = await usersRepository.findByEmail(email);

    if (emailExists) {
      throw new AppError('There is already an user with this name');
    }

    const user = usersRepository.create({
      name,
      email,
      password,
      avatar,
    });

    await usersRepository.save(user);
    return user;
  }
}

export default CreateUserService;
