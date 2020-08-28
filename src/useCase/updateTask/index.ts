import Task from '../../models/task';
import { PrismaClient} from '@prisma/client';


export async function updateTask(prisma: PrismaClient, task:Task): Promise<Task> {

  const changedTask = await prisma.task.update({
    where: {
        id: task.id,
    },
    data: {
        title: task.title, 
        finished: task.finished,
    }
  });

  return changedTask;
}
