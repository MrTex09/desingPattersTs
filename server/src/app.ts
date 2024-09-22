import express from 'express';
import dotenv from 'dotenv';
import helmet from 'helmet';
import cors from 'cors';
import { sequelize } from './config/db'; 
import authRoutes from './routes/authRoutes';
import equipmentRoutes from './routes/equipmentRoutes';
import userRouter from './routes/userRoutes';
import brandRoutes from './routes/brandRoutes';
import categoryRoutes from './routes/categoryRoutes';

dotenv.config();

const app = express();


app.use(express.json());
app.use(helmet());
app.use(cors());

// Rutas
app.use('/auth', authRoutes);
app.use('/api', userRouter);
app.use('/api', brandRoutes);
app.use('/api', categoryRoutes);
app.use('/equipments', equipmentRoutes);

const PORT = process.env.PORT || 3000;

sequelize.authenticate()
  .then(() => {
    console.log('Conexión exitosa a la base de datos');
    return sequelize.sync();
  })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Servidor corriendo en el puerto ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Error al conectar a la base de datos:', error);
  });
