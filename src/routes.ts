import express, { Router } from 'express';
import { PrismaClient } from '@prisma/client';

import { UserController } from './controllers/UserController';
import TaskController from './controllers/TaskController';

function configureRoutes(prisma: PrismaClient): Router {
  const router = express.Router();

  const userController = new UserController(prisma);
  const taskController = new TaskController(prisma);

  router.get('/users', userController.findAll);
  router.post('/users', userController.create);

  router.get('/tasks', taskController.findAll);
  router.post('/tasks', taskController.create);
  router.put('/tasks/:id', taskController.update);
  router.delete('/tasks/:id', taskController.remove);

  return router 
}

export default configureRoutes;
