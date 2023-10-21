import { Router } from 'express';

import { user, login } from '../validators';
import { async, validate, verifyRT, verifyAT } from '../middlewares';
import {
  registerCtrl,
  loginCtrl,
  googleLoginURL,
  refreshTokenCtrl,
  logoutCtrl,
} from '../controllers/auth.controller';

const router = Router();

router.post('/register', validate(user), async(registerCtrl));

router.post('/login', validate(login), async(loginCtrl));

router.get('/google', async(googleLoginURL));

router.post('/token/refresh', verifyRT, async(refreshTokenCtrl));

router.post('/logout', verifyAT, async(logoutCtrl));

export default router;
