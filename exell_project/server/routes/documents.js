import express from 'express';

import { getDocuments, getRecycledDocuments, createDocument, recycleDocuments, restoreDocuments, deleteDocuments } from '../controllers/documents.js';

const router = express.Router();
import auth from "../middleware/auth.js";

router.get('/',auth, getDocuments);
router.get('/recycle', auth, getRecycledDocuments);
router.post('/',auth, createDocument);
router.post('/recycle', auth, recycleDocuments);
router.post('/restore', auth, restoreDocuments);
router.post('/delete', auth, deleteDocuments);
// router.patch('/:id', auth, updatePost);
// router.patch('/:id/likePost', auth, likePost);

export default router;