import db from '../models';
import * as sendMail from '../utils/mail.util';
import { BadRequest } from '../core/error.response';

export const forgot = async (email) => {
  const user = await db.User.findOne({ where: { email } });

  if (!user) throw new BadRequest('Invalid Credentials');

  await sendMail.updatePassword(user);

  return { message: 'Please check your email to reset your password.', user };
};
