import { Router } from 'express';

import { user } from '../validators';
import { async, validate } from '../middlewares';
import { registerCtrl } from '../controllers/auth.controller';

const router = Router();

router.post('/register', validate(user), async(registerCtrl));

export default router;
