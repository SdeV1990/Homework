import express from 'express';

import { getDocuments, createDocument, deleteDocument } from '../controllers/documents.js';

const router = express.Router();
import auth from "../middleware/auth.js";

router.get('/',auth, getDocuments);
router.post('/',auth,  createDocument);
router.delete('/:id', auth, deleteDocument);
// router.patch('/:id', auth, updatePost);
// router.patch('/:id/likePost', auth, likePost);

export default router;