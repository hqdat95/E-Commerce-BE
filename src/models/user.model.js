import bcrypt from 'bcryptjs';
import { Model } from 'sequelize';
import { Roles } from '../constants';

class User extends Model {
  static associate(models) {
    this.hasMany(models.Order, {
      foreignKey: 'userId',
      as: 'order',
    });

    this.hasMany(models.TransportInfo, {
      foreignKey: 'userId',
      as: 'transportInfo',
    });
  }
}

export default (sequelize, DataTypes) => {
  User.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
      },
      role: {
        type: DataTypes.ENUM,
        values: Object.values(Roles),
        allowNull: false,
        defaultValue: Roles.CUSTOMER,
      },
      isGoogleLogin: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
    },
    {
      sequelize,
      modelName: 'User',
      tableName: 'users',
      timestamps: true,
      paranoid: true,
    },
  );
  const hashPassword = async (user) => {
    if (user.password || user.changed('password')) {
      user.password = await bcrypt.hashSync(user.password, 10);
    }
  };

  User.beforeCreate(hashPassword);
  User.beforeUpdate(hashPassword);

  User.prototype.toJSON = function () {
    if (this instanceof User) {
      const user = { ...this.get() };
      delete user.password;
      return user;
    }
  };

  return User;
};
