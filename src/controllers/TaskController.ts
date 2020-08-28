import { Request, Response } from 'express';
import { createTask } from '../useCase/createTask';
import { getTasks } from '../useCase/getTasks';
import { updateTask } from '../useCase/updateTask';
import { removeTask } from '../useCase/removeTask';
import { PrismaClient} from '@prisma/client';


class TaskController {

  private prisma: PrismaClient;

  constructor(prisma: PrismaClient){
    this.prisma = prisma;
    this.findAll = this.findAll.bind(this);
    this.remove = this.remove.bind(this);
    this.update = this.update.bind(this);
    this.create = this.create.bind(this);
  }

  async findAll(request: Request, response: Response) {
        try {
            const tasks = await getTasks(this.prisma);
            return response.json(tasks);
        } catch(err) {
            return response.json({ err: err.message });
        }
    }

  async remove(request: Request, response: Response) {
    try {
      const id = Number.parseInt(request.params.id)
      const task = await removeTask(this.prisma, id);

      return response.status(201).json(task);
    } catch(err) {
      return response.status(400).json({ err: err.message });
    }
  }

    async update(request: Request, response: Response) {
        try {
            const { title, finished = false } = request.body;

            const changedTask = await updateTask(this.prisma, {
              title,
              finished,
              authorId: Number.parseInt(request.params.id),
            });

            return response.json(changedTask);
        } catch (err) {
            return response.json({ err: err.message });
        }
    }

    async create(request: Request, response: Response) {
        try{
            
            const newTask = await createTask(this.prisma, { 
              title: request.body.title,
              authorId: request.body.authorId
            });

            return response.status(201).json(newTask);
        } catch(err) {
            return response.status(400).json({ err: err.message });
        }
    }
}

export default TaskController;  
