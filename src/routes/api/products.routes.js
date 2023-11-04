import { Router } from 'express';

import { product } from '../../validators';
import { async, validate } from '../../middlewares';
import * as productCtrl from '../../controllers/products.controller';

const router = Router();

router.post('/', validate(product), async(productCtrl.create));

router.get('/removed', async(productCtrl.findAllRemoved));

router.get('/', async(productCtrl.findAll));

router.get('/category/:categoryId', async(productCtrl.findByCategoryId));

router.get('/search', async(productCtrl.search));

router.get('/removed/:id', async(productCtrl.findOneRemoved));

router.get('/:id', async(productCtrl.findOne));

router.put('/:id', validate(product), async(productCtrl.update));

router.delete('/:id', async(productCtrl.remove));

router.put('/restore/:id', async(productCtrl.restore));

export default router;
