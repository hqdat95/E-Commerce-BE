import { Router } from 'express';

import { user } from '../../validators';
import { async, validate } from '../../middlewares';
import * as userCtrl from '../../controllers/users.controller';

const router = Router();

router.get('/removed', async(userCtrl.findAllRemoved));

router.get('/removed/:id', async(userCtrl.findOneRemoved));

router.get('/', async(userCtrl.findAll));

router.get('/:id', async(userCtrl.findOne));

router.put('/:id', validate(user), async(userCtrl.update));

router.delete('/:id', async(userCtrl.remove));

router.put('/restore/:id', async(userCtrl.restore));

export default router;
