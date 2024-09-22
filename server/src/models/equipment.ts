import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../config/db';
import { Brand } from './brandModel'; 
import { Category } from './Category';

class Equipment extends Model {
  public id!: string;
  public name!: string;
  public status!: string;
  public location!: string;
  public purchaseDate!: Date;
  public brandId!: string;
  public categoryId!: string;
}

Equipment.init({
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false
  },
  location: {
    type: DataTypes.STRING,
    allowNull: false
  },
  purchaseDate: {
    type: DataTypes.DATE,
    allowNull: false
  },
  brandId: {
    type: DataTypes.UUID,
    references: {
      model: Brand,
      key: 'id'
    }
  },
  categoryId: {
    type: DataTypes.UUID,
    references: {
      model: Category,
      key: 'id'
    }
  }
}, {
  sequelize,
  tableName: 'equipments'
});

Equipment.belongsTo(Brand, { foreignKey: 'brandId' });
Equipment.belongsTo(Category, { foreignKey: 'categoryId' });
Brand.hasMany(Equipment, { foreignKey: 'brandId' });
Category.hasMany(Equipment, { foreignKey: 'categoryId' });

export { Equipment };

