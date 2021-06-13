import Document from '../models/document.js'

export const getDocument = async (req, res) => { 
    try {

        const userId = req.userId
        const documentID = req.body.documentId
        
        // Get document
        const document = await Document.findById(documentID)
        const creatorID = document.createdBy
        const trustedUsers = document.rightsAccess.readAndCopy

        // If user is creator of document or have rights
        let result
        if (userId == creatorID || trustedUsers.includes(userId)) {
            result = document
        }

        res.status(200).json(result)
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

// Save document  
export const saveDocument = async (req, res) => { 
    try {

        const userId = req.userId
        const documenToSave = req.body.documenToSave.document
        const documentID = documenToSave._id
        const creatorID = documenToSave.createdBy

        // If user is creator of document
        if (userId == creatorID ) {

            // Find by ID and save document
            await Document.findByIdAndUpdate(documentID, documenToSave)

        }

        res.status(200).json('DOCUMENT SAVED')
    } catch (error) {
        console.log(error)
        res.status(404).json({ message: error.message })
    }
}