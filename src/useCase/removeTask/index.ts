import { PrismaClient } from '@prisma/client';
import Task from '../../models/task';

export async function removeTask(prisma: PrismaClient, id: number): Promise<Task> {

  const task = await prisma.task.delete({
    where: {
      id,
    }
  });

  return task;
}
