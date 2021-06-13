import User from '../models/user.js'
import Document from '../models/document.js'

export const getDocuments = async (req, res) => { 
    try {

        const userId = req.userId
        const isRecycled = req.body.isRecycled

        // Get filter by type (path)
        const filter = {
            createdBy: userId,
            isRecycled: isRecycled, 
            isDeleted: false, 
        }

        // Return only needed props
        const projection = {
            name: 1,
            createdAt: 1,
            changedAt: 1, 
            recycledAt: 1,
            isRecycled: 1,
            rightsAccess: 1,
        }

        //Get documents
        const documents = await Document.find(filter, projection)
                                        .populate('createdBy', 'name')

        // Response
        res.status(200).json(documents);

    } catch (error) {

        res.status(404).json({ message: error.message })
        console.log('Get documents error.')

    }
}

export const createDocument = async (req, res) => { 
    try {

        // If user is exist
        const user = await User.findById(req.userId)

        // Get name of new document from request
        const newDocumentName = req.body.name

        // Create document template
        const newDocument = {
            name: newDocumentName, 
            createdBy: user._id,
            createdAt: new Date(),
            changedAt: new Date(),
            sheets: [{
                id: '1',
                name: 'Sheet 1',
            }]
        }

        // Creating document in DB
        let newDoc = await Document.create(newDocument)

        // Response
        res.status(200).json({ message: 'Document is created.' })

    } catch (error) {

        res.status(404).json( { message: error.message } )
        console.log('Create documents error.')

    }
}

export const updateDocuments = async (req, res) => { 
    try {

        const documentsIDToUpdate = req.body.selectedDocuments
        const userId = req.userId
        
        // Get needed documenys if user is autor
        const filter = { 
            _id: { $in: documentsIDToUpdate }, 
            createdBy: { $in: userId },
        }

        // Set update by type
        const update = {
            'RECYCLE': { $set: {
                    isRecycled: true,
                    recycledAt: new Date(),
                },
            },
            'RESTORE': { $set: {
                    isRecycled: false,
                    recycledAt: '',
                },
            },
            'DELETE': { $set: {
                    isDeleted: true,
                    deletedAt: new Date(),
                },
            },
        }

        // Update filtered documents
        const updateType = req.body.updateType
        const documentsToUpdate = await Document.updateMany(filter, update[updateType])

        res.status(200).json({ message: updateType +': SUCCESS' })
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}