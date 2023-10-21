import db from '../models';
import bcrypt from 'bcryptjs';
import redis from '../redis/connect.redis';
import * as sendMail from '../utils/mail.util';
import { BadRequest } from '../core/error.response';
import handleGoogleLogin from '../utils/google.util';

export const forgot = async (email) => {
  const user = await db.User.findOne({ where: { email } });

  if (!user) throw new BadRequest('Invalid Credentials');

  if (user.isGoogleLogin && !user.password) {
    return await handleGoogleLogin(user);
  }

  await sendMail.updatePassword(user);

  return { message: 'Please check your email to reset your password.', user };
};

export const update = async (user, newPassword) => {
  if (user.password !== null && bcrypt.compareSync(newPassword, user.password)) {
    throw new BadRequest('Warning: You should not set the same password as your old password!');
  }

  await Promise.all([redis.del(`OTP:${user.id}`), user.update({ password: newPassword })]);

  return { message: 'Password has been update successfully.', user };
};
