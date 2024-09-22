import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const { DB_NAME, DB_USER, DB_PASS, DB_HOST } = process.env;

if (!DB_NAME || !DB_USER || !DB_PASS || !DB_HOST) {
  throw new Error('Faltan variables de entorno necesarias para la conexión a la base de datos.');
}

export const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASS, {
  host: DB_HOST,
  dialect: 'postgres',
  logging: false,
});

// Probar la conexión
sequelize
  .authenticate()
  .then(() => {
    console.log('Conexión exitosa a la base de datos');
  })
  .catch((error: any) => {
    console.error('Error al conectar a la base de datos:', error);
  });
