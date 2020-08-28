import User from '../../models/user';
import { PrismaClient } from '@prisma/client';


export async function createUser(prisma: PrismaClient, user: User): Promise<User> {

  const userFounded = await prisma.user.findOne({
    where: {
      email: user.email
    }
  });

  if (userFounded) throw new Error("O email já foi registrado");
  
  const { name='', password='', email } = user;

  const newUser = await prisma.user.create({
    data: {
      email: email,
      password: password,
      name: name
    }
  });

  return newUser;
}
