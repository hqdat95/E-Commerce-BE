import { Router } from 'express';

import { async, upload } from '../middlewares';
import * as imagesCtrl from '../controllers/images.controller';

const router = Router();

router.post('/:productId', upload, async(imagesCtrl.upload));

router.get('/removed', async(imagesCtrl.findAllRemoved));

router.get('/', async(imagesCtrl.findAll));

router.get('/:productId', async(imagesCtrl.findByProductId));

router.get('/removed/url/:productId', async(imagesCtrl.findOneRemoved));

router.get('/url/:productId', async(imagesCtrl.findOne));

router.put('/:productId', upload, async(imagesCtrl.update));

router.delete('/folder/:productId', async(imagesCtrl.remove));

router.put('/folder/restore/:productId', async(imagesCtrl.restore));

export default router;
