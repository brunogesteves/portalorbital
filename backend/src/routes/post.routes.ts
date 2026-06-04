import { Router } from 'express';
import multer from 'multer';
import path from 'path';
import { getPosts, getPostById, createPost, updatePost, deletePost, uploadEditorImage, getImages, updatePostStatus, allPosts } from '../controllers/post.controller';
import { authenticate } from '../middlewares/auth.middleware';

const router = Router();

// Configuração do Multer para upload local
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../../public/uploads'));
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ storage });

router.get('/', authenticate, getPosts);
router.get('/all',  allPosts);
router.get('/images', authenticate, getImages);
router.get('/:id', authenticate, getPostById);
router.post('/upload-image', authenticate, upload.single('image'), uploadEditorImage);
router.post('/', authenticate, upload.single('thumbnail'), createPost);
router.put('/:id', authenticate, upload.single('thumbnail'), updatePost);
router.patch('/:id/status', authenticate, updatePostStatus);
router.delete('/:id', authenticate, deletePost);

export default router;
