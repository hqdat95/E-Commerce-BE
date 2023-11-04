import fs from 'fs';
import path from 'path';
import app from '../configs/app.config';
import redis from '../redis/connect.redis';
import config from '../configs/mail.config';
import expiresIn from '../configs/auth.config';

const sendEmail = async (email, subject, routePath, templatePath, replacements) => {
  const template = fs.readFileSync(path.join(__dirname, templatePath), 'utf8');

  let emailContent = template;

  for (const key in replacements) {
    emailContent = emailContent.replace(new RegExp(`<%= ${key} %>`, 'g'), replacements[key]);
  }

  emailContent = emailContent.replace(/<%= URL %>/g, `${app.APP_URL}/${app.APP_VERSION}/${routePath}`);

  return config.sendMail({
    from: process.env.ADMIN_EMAIL,
    to: email,
    subject: subject,
    html: emailContent,
  });
};

const generateOTP = async (user) => {
  const otp = String(Math.random()).slice(2, 8).padEnd(6, '2');

  await redis.set(`OTP:${user.id}`, otp, 'EX', parseInt(expiresIn.OTP_EXPIRES_IN));

  return otp;
};

export const updatePassword = async (user) => {
  const otp = await generateOTP(user);

  const subject = 'E-Commerce Website: Update Password';
  const routePath = `password/update/${user.id}`;
  const templatePath = '../views/password.hbs';
  const replacements = { OTP: otp };

  return sendEmail(user.email, subject, routePath, templatePath, replacements);
};
