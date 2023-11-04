import { Router } from 'express';

import { cart } from '../../validators';
import { async, verifyAT, validate, checkLogin } from '../../middlewares';
import * as cartItemCtrl from '../../controllers/cart.controller';

const router = Router();

router.post('/', checkLogin, async(cartItemCtrl.create));

router.get('/removed', verifyAT, async(cartItemCtrl.findAllRemoved));

router.get('/removed/:id', verifyAT, async(cartItemCtrl.findOneRemoved));

router.get('/', checkLogin, async(cartItemCtrl.findAll));

router.get('/:id', checkLogin, async(cartItemCtrl.findOne));

router.put('/:id', checkLogin, validate(cart), async(cartItemCtrl.update));

router.delete('/:id', checkLogin, async(cartItemCtrl.remove));

router.put('/restore/:id', verifyAT, async(cartItemCtrl.restore));

export default router;
