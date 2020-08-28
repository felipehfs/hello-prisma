import express from 'express';
import { PrismaClient } from '@prisma/client';
import cors from 'cors';
import configurateRouter from './routes';

const prisma = new PrismaClient();
const app = express();

const route = configurateRouter(prisma);

app.use(cors());
app.use(express.json());
app.use(route);

export default app;
