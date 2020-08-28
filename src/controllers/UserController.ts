import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

export class UserController {

    constructor(private prisma: PrismaClient){
      this.findAll = this.findAll.bind(this);
      this.create = this.create.bind(this);
    }

    async findAll(request: Request, response: Response) {
        try {
            const allUsers = await this.prisma.user.findMany();
            return response.json(allUsers);
        } catch(err) {
            return response.json({ err: err.message })
        }
    }


    async create(request: Request, response: Response) {
        try {

            const hasEmail = await this.prisma.user.findOne({
              where: {
                email: request.body.email
              }
            });

            if (hasEmail) return response.status(400).json({ err: 'O email deve ser único' });
            
            const newUser = await this.prisma.user.create({
                data: {
                    email: request.body.email,
                    name: request.body.name,
                    password: request.body.password
                }
            });

            return response.status(201).json(newUser);
        } catch (err) {
            return response.json({ err: err.message });
        }
    }
} 
