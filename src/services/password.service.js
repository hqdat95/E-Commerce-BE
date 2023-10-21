import db from '../models';
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
