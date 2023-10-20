import bcrypt from 'bcryptjs';
import { Roles } from '../../constants';

export default {
  up: async (queryInterface, Sequelize) => {
    const isExist = await queryInterface.sequelize.query(
      `SELECT * FROM users WHERE role = '${Roles.ADMIN}'`,
      {
        type: queryInterface.sequelize.QueryTypes.SELECT,
      },
    );

    if (isExist.length === 0) {
      const admin = {
        id: Sequelize.literal('UUID()'),
        username: process.env.ADMIN_USERNAME,
        email: process.env.ADMIN_EMAIL,
        password: await bcrypt.hashSync(process.env.ADMIN_PASSWORD, 10),
        role: Roles.ADMIN,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      await queryInterface.bulkInsert('users', [admin]);
    }
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('users', null, {});
  },
};
