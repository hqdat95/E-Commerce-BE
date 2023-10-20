import { Router } from 'express';

import { async, verifyAT } from '../middlewares';
import * as homeCtrl from '../controllers/home.controller';

const router = Router();

router.get('/', verifyAT, async(homeCtrl.home));

export default router;
