import { Router } from 'express';

import { async } from '../../middlewares';
import * as homeCtrl from '../../controllers/home.controller';

const router = Router();

router.get('/', async(homeCtrl.home));

export default router;
