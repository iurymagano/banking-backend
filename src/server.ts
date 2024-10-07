import express, { Express } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import routesAuth from './routes/routesAuth';

const app: Express = express();

app.use(cors());
app.use(helmet());

app.use(express.json());

app.use('/auth', routesAuth);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
