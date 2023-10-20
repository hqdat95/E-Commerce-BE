import { Router } from 'express';

import { async } from '../middlewares';
import { homeCtrl } from '../controllers/home.controller';

const router = Router();

router.get('/', async(homeCtrl));

export default router;
