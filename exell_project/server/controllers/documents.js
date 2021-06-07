// import express from 'express';
// import mongoose from 'mongoose';
// const router = express.Router();

import User from '../models/user.js';
import Document from '../models/document.js';

export const getDocuments = async (req, res) => { 
    try {

        const userId = req.userId
        const usersDocuments = await Document.find({ isDeleted: false, isRecycled: false, createdBy: userId })
                                            .populate('createdBy', 'name');

        res.status(200).json(usersDocuments);

    } catch (error) {

        res.status(404).json({ message: error.message });
        console.log('Get documents error.');

    }
}

export const getRecycledDocuments = async (req, res) => { 
    try {

        const userId = req.userId
        const usersRecycledDocuments = await Document.find({ isDeleted: false, isRecycled: true, createdBy: userId })
                                            .populate('createdBy', 'name');

        res.status(200).json(usersRecycledDocuments);

    } catch (error) {

        res.status(404).json({ message: error.message });
        console.log('Get documents error.');

    }
}

export const createDocument = async (req, res) => { 
    try {
        const user = await User.findById(req.userId);
        const newDocumentName = req.body.name

        const newDocument = {
            name: newDocumentName, 
            createdBy: user._id,
            createdAt: new Date(),
            changedAt: new Date(),
            sheets: [{
                id: '1',
                name: 'Sheet 1',
                rowQuantity: 10 ,
                rowDefaultHeight: 21 ,
                columnQuantity: 10,
                columnDefaultWidth: 60 ,
                cells: {}
            }]
        }

        let newDoc = await Document.create(newDocument);
        newDoc = await newDoc.populate('createdBy', 'name').execPopulate();
        newDoc = newDoc.toObject();

        res.status(200).json(newDoc);

    } catch (error) {

        res.status(404).json( { message: error.message } );
        console.log('Create documents error.');

    }
}

export const recycleDocuments = async (req, res) => { 
    try {
        const userId = req.userId
        console.log(req.body.selectedDocuments)
        const documentsIDToRecycle = req.body.selectedDocuments

        // Get needed documenys if user is autor
        const filter = { 
            _id: { $in: documentsIDToRecycle }, 
            createdBy: { $in: userId },
        }

        const update = { $set: {
                isRecycled: true,
                recycledAt: new Date(),
            }
        }

        const documentsToRecycle = await Document.updateMany(filter, update)
        console.log(documentsToRecycle)

        res.status(200).json(documentsToRecycle)
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

export const restoreDocuments = async (req, res) => { 
    try {
        const userId = req.userId
        const documentsIDToRestore = req.body.selectedDocuments

        const documentsToRestore = await Document.find( { _id: { $in: documentsIDToRestore } } )
        
        // If user is autor
        documentsToRestore.map( (document) => {
            if ( userId == document.createdBy ) {
                document.isRecycled = false
                document.recycledAt = new Date();
                document.save()
            }
        })
        Document.updateMany(documentsToRestore);

        res.status(200).json(documentsToRestore)
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

export const deleteDocuments = async (req, res) => { 
    try {
        const userId = req.userId
        const documentsIDToDelete = req.body.selectedDocuments

        const documentsToDelete = await Document.find( { _id: { $in: documentsIDToDelete } } );

        // If user is autor
        documentsToDelete.map( (document) => {
            if ( userId == document.createdBy ) {
                document.isDeleted = true
                document.deletedAt = new Date();
                document.save(); 
            }
        })
        Document.updateMany(documentsToDelete);

        res.status(200).json(documentsToDelete);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const updateDocuments = async (req, res) => { 
    try {
        const userId = req.userId
        console.log(req.body)
        const updateType = req.body.updateType
        const documentsIDToUpdate = req.body.selectedDocuments

        // Get needed documenys if user is autor
        const filter = { 
            _id: { $in: documentsIDToUpdate }, 
            createdBy: { $in: userId },
        }

        // Set update by type
        const update = ((type) => {

            // Recycle document
            if (type === "RECYCLE") {
                return { $set: {
                        isRecycled: true,
                        recycledAt: new Date(),
                    }
                }
            }

            // Restore document
            if (type === "RESTORE") {
                return { $set: {
                        isRecycled: false,
                        recycledAt: "",
                    }
                }
            }

            // Delete document
            if (type === "DELETE") {
                return { $set: {
                        isDeleted: true,
                        deletedAt: new Date(),
                    }
                }
            }
        })(updateType)

        const documentsToUpdate = await Document.updateMany(filter, update)
        console.log(documentsToUpdate)

        res.status(200).json(documentsToUpdate)
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}