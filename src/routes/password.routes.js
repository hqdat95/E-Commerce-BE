import { Router } from 'express';

import { password } from '../validators';
import { async, validate } from '../middlewares';
import * as passwordCtrl from '../controllers/password.controller';

const router = Router();

router.post('/forgot', validate(password.forgot), async(passwordCtrl.forgot));

export default router;
