import { Router } from 'express';

import homeRoutes from './home.routes';
import authRoutes from './auth.routes';

const router = Router();

router.use('/', homeRoutes);
router.use('/auth', authRoutes);

export default router;
