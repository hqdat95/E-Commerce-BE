import { Router } from 'express';

import homeRoutes from './home.routes';
import authRoutes from './auth.routes';
import passwordRoutes from './password.routes';

const router = Router();

router.use('/', homeRoutes);
router.use('/auth', authRoutes);
router.use('/password', passwordRoutes);

export default router;
