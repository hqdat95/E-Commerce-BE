import { Router } from 'express';

import homeRoutes from './home.routes';
import authRoutes from './auth.routes';
import passwordRoutes from './password.routes';
import usersRoutes from './users.routes';
import categoriesRoutes from './categories.routes';
import productsRoutes from './products.routes';
import infosRoutes from './infos.routes';
import imagesRoutes from './images.routes';

const router = Router();

router.use('/', homeRoutes);
router.use('/auth', authRoutes);
router.use('/password', passwordRoutes);
router.use('/users', usersRoutes);
router.use('/categories', categoriesRoutes);
router.use('/products', productsRoutes);
router.use('/infos', infosRoutes);
router.use('/images', imagesRoutes);

export default router;
