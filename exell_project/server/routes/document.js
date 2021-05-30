import express from 'express'
import { getDocument } from '../controllers/document.js'
import auth from "../middleware/auth.js"

const router = express.Router()

router.post('/', auth, getDocument);
// router.post('/',auth, createDocument);
// router.delete('/:id', auth, deleteDocument);
// router.patch('/:id', auth, updatePost);
// router.patch('/:id/likePost', auth, likePost);

export default router;