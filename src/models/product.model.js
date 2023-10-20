import { Model } from 'sequelize';

class Product extends Model {
  static associate(models) {
    this.belongsTo(models.Category, {
      foreignKey: 'categoryId',
      as: 'category',
    });

    this.hasMany(models.ProductImage, {
      foreignKey: 'productId',
      as: 'image',
    });

    this.hasMany(models.OrderItem, {
      foreignKey: 'productId',
      as: 'orderItem',
    });
  }
}

export default (sequelize, DataTypes) => {
  Product.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
      },
      price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      categoryId: {
        type: DataTypes.UUID,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'Product',
      tableName: 'products',
      timestamps: true,
      paranoid: true,
    },
  );

  return Product;
};
