import { Router } from 'express';

import { user, login } from '../validators';
import { async, validate } from '../middlewares';
import { registerCtrl, loginCtrl, googleLoginURL } from '../controllers/auth.controller';

const router = Router();

router.post('/register', validate(user), async(registerCtrl));

router.post('/login', validate(login), async(loginCtrl));

router.get('/google', async(googleLoginURL));

export default router;
