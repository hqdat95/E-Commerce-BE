import { Router } from 'express';

import { async, verifyAT } from '../middlewares';
import { homeCtrl } from '../controllers/home.controller';

const router = Router();

router.get('/', verifyAT, async(homeCtrl));

export default router;
