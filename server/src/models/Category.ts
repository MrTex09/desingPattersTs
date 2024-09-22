import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../config/db'; 
import { Brand } from './brandModel'; 

class Category extends Model {
  public id!: string;
  public name!: string;
}
Category.init({
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  sequelize,
  tableName: 'categories'
});

Category.belongsTo(Brand, { foreignKey: 'brandId' });
Brand.hasMany(Category, { foreignKey: 'brandId' });

export { Category };