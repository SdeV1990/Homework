import express from 'express'
import { getDocuments, getRecycledDocuments, createDocument, recycleDocuments, restoreDocuments, deleteDocuments } from '../controllers/documents.js'
import auth from "../middleware/auth.js"

const router = express.Router()

router.get('/',auth, getDocuments)
router.get('/recycle', auth, getRecycledDocuments)
router.post('/',auth, createDocument)
router.post('/recycle', auth, recycleDocuments)
router.post('/restore', auth, restoreDocuments)
router.post('/delete', auth, deleteDocuments)

export default router;