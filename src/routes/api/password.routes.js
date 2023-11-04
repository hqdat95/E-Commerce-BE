import { Router } from 'express';

import { password } from '../../validators';
import { async, validate, verifyOTP, verifyAT } from '../../middlewares';
import * as passwordCtrl from '../../controllers/password.controller';

const router = Router();

router.post('/forgot', validate(password.forgot), async(passwordCtrl.forgot));

router.post('/update/:id', verifyOTP, validate(password.update), async(passwordCtrl.update));

router.post('/change', verifyAT, validate(password.change), async(passwordCtrl.change));

export default router;
