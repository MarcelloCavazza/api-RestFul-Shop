import { Request, Response } from 'express';
import CreateUserService from '../services/CreateUserService';
import ListUserService from '../services/ListUserService';

export default class UsersController {
  public async index(request: Request, response: Response): Promise<Response> {
    const listUser = new ListUserService();

    const users = await listUser.execute().catch(e => {
      response.send(e);
    });

    return response.json(users);
  }
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, email, password, avatar } = request.body;

    const createUser = new CreateUserService();

    const user = await createUser
      .execute({
        name,
        email,
        password,
        avatar,
      })
      .catch(e => {
        response.send(e);
      });

    return response.json(user);
  }
}
