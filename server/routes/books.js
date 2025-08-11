
import express from 'express';
import { getBooks, addBook } from '../controllers/booksController.js';
import { authMiddleware, adminMiddleware } from '../middleware/auth.js';

const router = express.Router();

router.get('/', getBooks);
router.post('/', authMiddleware, adminMiddleware, addBook);

export default router;