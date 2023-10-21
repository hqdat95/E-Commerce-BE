import { Router } from 'express';

import homeRoutes from './home.routes';
import authRoutes from './auth.routes';
import passwordRoutes from './password.routes';
import usersRoutes from './users.routes';

const router = Router();

router.use('/', homeRoutes);
router.use('/auth', authRoutes);
router.use('/password', passwordRoutes);
router.use('/users', usersRoutes);

export default router;
