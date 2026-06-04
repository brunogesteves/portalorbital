import { Router } from 'express';
import { authenticate } from '../middlewares/auth.middleware';
import { searchContent } from '../controllers/search.controller';

const router = Router();




router.get('/:slug', searchContent);
// router.delete('/:term', authenticate, searchContent);

export default router;
