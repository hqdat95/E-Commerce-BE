import session from 'express-session';
import RedisStore from 'connect-redis';
import redis from '../redis/connect.redis';
import secret from '../configs/auth.config';

export default session({
  store: new RedisStore({
    client: redis,
    ttl: 24 * 60 * 60,
  }),
  secret: secret.SESSION,
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 24 * 60 * 60 * 1000,
  },
});
