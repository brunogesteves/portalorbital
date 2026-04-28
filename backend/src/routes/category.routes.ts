import { Router } from 'express';
import { getCategories, createCategory, deleteCategory } from '../controllers/category.controller';
import { authenticate, authorize } from '../middlewares/auth.middleware';
import { Role } from '@prisma/client';

const router = Router();

router.get('/', authenticate, getCategories);
router.post('/', authenticate, authorize([Role.ADM]), createCategory);
router.delete('/:id', authenticate, authorize([Role.ADM]), deleteCategory);

export default router;
