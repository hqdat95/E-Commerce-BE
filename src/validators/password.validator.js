import userSchema from './user.validator';

export default {
  forgot: () => {
    return { email: userSchema().email };
  },
};
