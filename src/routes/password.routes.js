import { Router } from 'express';

import { password } from '../validators';
import { async, validate, verifyOTP } from '../middlewares';
import * as passwordCtrl from '../controllers/password.controller';

const router = Router();

router.post('/forgot', validate(password.forgot), async(passwordCtrl.forgot));

router.post('/update/:id', verifyOTP, validate(password.update), async(passwordCtrl.update));

export default router;
