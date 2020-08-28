import { PrismaClient, UserWhereUniqueInput } from '@prisma/client';
import Task from '../../models/task';

export async function createTask(prisma: PrismaClient, task: Task): Promise<Task> {

  const searchUser: UserWhereUniqueInput =  {
    id: task.authorId
  }
  
  const newTask = await prisma.task.create({
    data: {
        User: {
            connect: searchUser
        },
        title: task.title,
    }
  });
  
  return newTask
}
