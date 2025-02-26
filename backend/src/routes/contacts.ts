import { Router } from 'express';

import { getContacts, createContact } from '../controllers/contacts';

const router = Router();


router.post('/', createContact);

router.get('/', getContacts);

router.put('/:id');

router.delete('/:id');

export default router;
