
import { User } from '../models/user';
import bcrypt from 'bcryptjs';
import { sequelize } from '../config/db'; 

const createAdminUser = async () => {
  try {
    console.log('Conectando a la base de datos...');
    await sequelize.authenticate();
    console.log('Conexión exitosa a la base de datos');
    console.log('Verificando si el usuario admin ya existe...');
    const existingAdmin = await User.findOne({ where: { username: 'admin1' } });
    if (existingAdmin) {
      console.log('Admin user already exists');
      return;
    }
    console.log('Creando el usuario admin...');
    const hashedPassword = await bcrypt.hash('2004', 10);

    const newUser = await User.create({
      username: 'admin1',
      gmail: 'admin1@example.com',
      password: hashedPassword,
      role: 'admin',
    });

    console.log('Admin user created', newUser);
  } catch (error) {
    console.error('Error creating admin user:', error);
  }
};

createAdminUser();
