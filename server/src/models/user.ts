import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../config/db';
interface UserAttributes {
  id: number;
  username: string;
  gmail: string;
  password: string;
  role: 'admin' | 'user';
}


type UserCreationAttributes = Optional<UserAttributes, 'id'>;

export class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
  public id!: number;
  public username!: string;
  public gmail!: string;
  public password!: string;
  public role!: 'admin' | 'user';

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}


User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true, 
      primaryKey: true,   
      allowNull: false,   
    },
    username: {
      type: DataTypes.STRING,
      unique: true,         
    },
    gmail: {
      type: DataTypes.STRING,
      allowNull: false,     
      unique: true,         
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,     
    },
    role: {
      type: DataTypes.ENUM('admin', 'user'),
      allowNull: false,     
    },
  },
  {
    sequelize,               
    tableName: 'users',      
    timestamps: true,       
  }
);
