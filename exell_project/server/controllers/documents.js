// import express from 'express';
// import mongoose from 'mongoose';

import User from '../models/user.js';
import Document from '../models/document.js';

// const router = express.Router();

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
        const documentsIDToRecycle = req.body.selectedDocuments

        const documentsToRecycle = await Document.find( { _id: { $in: documentsIDToRecycle } } );

        // If user is autor
        documentsToRecycle.map( (document) => {
            if ( userId == document.createdBy ) {
                document.isRecycled = true
                document.recycledAt = new Date();
                document.save()
            }
        })
        Document.updateMany(documentsToRecycle);

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

// export const updatePost = async (req, res) => {
//     const { id } = req.params;
//     const { title, message, creator, selectedFile, tags } = req.body;
    
//     if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

//     const updatedPost = { creator, title, message, tags, selectedFile, _id: id };

//     await PostMessage.findByIdAndUpdate(id, updatedPost, { new: true });

//     res.json(updatedPost);
// }
