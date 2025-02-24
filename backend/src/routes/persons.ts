import { Router } from 'express';
import { createPerson, getPersons } from '../controllers/persons'

const router = Router();

router.post('/', createPerson);

router.get('/', getPersons);

router.put('/:id');

router.delete('/:id');

export default router;