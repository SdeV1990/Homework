import express from 'express'
import { getDocuments, createDocument, updateDocuments } from '../controllers/documents.js' //getRecycledDocuments, recycleDocuments, restoreDocuments, deleteDocuments,
import auth from "../middleware/auth.js"

const router = express.Router()

router.post('/',auth, getDocuments)
router.get('/recycle', auth, getDocuments)
router.post('/create',auth, createDocument)
router.post('/update', auth, updateDocuments)

export default router;