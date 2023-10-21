import { Router } from 'express';

import { user, login } from '../validators';
import { async, validate, verifyRT, verifyAT } from '../middlewares';
import * as authCtrl from '../controllers/auth.controller';

const router = Router();

router.post('/register', validate(user), async(authCtrl.register));

router.post('/login', validate(login), async(authCtrl.login));

router.get('/google', async(authCtrl.googleLoginURL));

router.post('/token/refresh', verifyRT, async(authCtrl.refreshToken));

router.post('/logout', verifyAT, async(authCtrl.logout));

export default router;
