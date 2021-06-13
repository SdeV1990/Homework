import express from 'express'
import { getDocument, saveDocument } from '../controllers/document.js'
import auth from "../middleware/auth.js"

const router = express.Router()

router.post('/', auth, getDocument)
router.post('/save', auth, saveDocument)

export default router;