import { Router } from 'express';

import { getContactTypes } from '../controllers/contacttypes';

const router = Router();

router.post('/');

router.get('/', getContactTypes);

router.put('/:id');

router.delete('/:id');

export default router;