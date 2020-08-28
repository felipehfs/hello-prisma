import { PrismaClient } from '@prisma/client';
import Task from '../../models/task';

export async function getTasks(prisma: PrismaClient):Promise<Task[]> {
  const tasks = await prisma.task.findMany();
  return tasks;
}
