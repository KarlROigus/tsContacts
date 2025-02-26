import { Router } from 'express';

import { getContactTypes, createContactType } from '../controllers/contacttypes';

const router = Router();

router.post('/', createContactType);

router.get('/', getContactTypes);

router.put('/:id');

router.delete('/:id');

export default router;