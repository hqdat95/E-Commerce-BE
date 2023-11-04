import { Router } from 'express';

import { info } from '../../validators';
import { async, verifyAT, validate, checkLogin } from '../../middlewares';
import * as infoCtrl from '../../controllers/infos.controller';

const router = Router();

router.post('/', checkLogin, validate(info), async(infoCtrl.create));

router.get('/removed', verifyAT, async(infoCtrl.findAllRemoved));

router.get('/removed/:id', verifyAT, async(infoCtrl.findOneRemoved));

router.get('/', checkLogin, async(infoCtrl.findAll));

router.get('/:id', checkLogin, async(infoCtrl.findOne));

router.put('/:id', checkLogin, validate(info), async(infoCtrl.update));

router.delete('/:id', checkLogin, async(infoCtrl.remove));

router.put('/restore/:id', verifyAT, async(infoCtrl.restore));

export default router;
