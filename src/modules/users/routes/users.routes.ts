import { celebrate, Segments } from 'celebrate';
import { Router } from 'express';
import Joi from 'joi';
import UsersController from '../Controller/UsersController';

const usersRouter = Router();
const usersController = new UsersController();

usersRouter.get('/listAll', usersController.index);

usersRouter.post(
  '/createUser',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
      avatar: Joi.string().required(),
    },
  }),
  usersController.create,
);

export default usersRouter;
