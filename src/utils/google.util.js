import * as sendMail from './mail.util';

export default async (user) => {
  await sendMail.updatePassword(user);

  const message =
    'Your account is signed in with Google. If you are the one who did this, please check your email to update your password.';

  return { message, user };
};
