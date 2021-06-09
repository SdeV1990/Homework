// import express from 'express';
// import mongoose from 'mongoose';
// const router = express.Router();

import User from '../models/user.js';
import Document from '../models/document.js';

export const getDocuments = async (req, res) => { 
    try {

        const userId = req.userId
        const isRecycled = req.body.isRecycled
        const path = req.path

        // Get filter by type (path)
        const filter = {
            isDeleted: false, 
            isRecycled: isRecycled, 
            createdBy: userId 
        }

        const documents = await Document.find(filter)
                                        .populate('createdBy', 'name');

        console.log(documents)

        res.status(200).json(documents);

    } catch (error) {

        res.status(404).json({ message: error.message });
        console.log('Get documents error.');

    }
}

export const createDocument = async (req, res) => { 
    try {

        // If user is exist
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
                columnDefaultWidth: 80 ,
                cells: {}
            }]
        }

        // Creating document in DB
        let newDoc = await Document.create(newDocument);

        // Populate creator
        newDoc = await newDoc.populate('createdBy', 'name').execPopulate();
        newDoc = newDoc.toObject();

        res.status(200).json(newDoc);

    } catch (error) {

        res.status(404).json( { message: error.message } );
        console.log('Create documents error.');

    }
}

export const updateDocuments = async (req, res) => { 
    try {

        const userId = req.userId
        const updateType = req.body.updateType
        const documentsIDToUpdate = req.body.selectedDocuments

        // Get needed documenys if user is autor
        const filter = { 
            _id: { $in: documentsIDToUpdate }, 
            createdBy: { $in: userId },
        }

        // Set update by type
        const update = {
            "RECYCLE": { $set: {
                    isRecycled: true,
                    recycledAt: new Date(),
                },
            },
            "RESTORE": { $set: {
                    isRecycled: false,
                    recycledAt: "",
                },
            },
            "DELETE": { $set: {
                    isDeleted: true,
                    deletedAt: new Date(),
                },
            },
        }

        // Update filtered documents
        const documentsToUpdate = await Document.updateMany(filter, update[updateType])
        console.log(documentsToUpdate)

        res.status(200).json({ message: "SUCCESS" })
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}