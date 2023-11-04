import { Router } from 'express';

import { category } from '../../validators';
import { async, validate } from '../../middlewares';
import * as categoryCtrl from '../../controllers/categories.controller';

const router = Router();

router.post('/', validate(category), async(categoryCtrl.create));

router.get('/removed/:parentId?', async(categoryCtrl.findAllRemoved));

router.get('/removed/pk/:id', async(categoryCtrl.findOneRemoved));

router.get('/:parentId?', async(categoryCtrl.findAll));

router.get('/pk/:id', async(categoryCtrl.findOne));

router.put('/:id', validate(category), async(categoryCtrl.update));

router.delete('/:id', async(categoryCtrl.remove));

router.put('/restore/:id', async(categoryCtrl.restore));

export default router;
