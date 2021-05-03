import express from 'express';
import mongoose from 'mongoose';

import User from '../models/user.js';
import Document from '../models/document.js';

const router = express.Router();

export const getDocuments = async (req, res) => { 
    try {

        const userId = req.userId
        const userDocuments = await Document.find({isRecycled: false, createdBy: userId })
                                            .populate('createdBy', 'name');

        res.status(200).json(userDocuments);

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

export const deleteDocument = async (req, res) => { 
    try {
        const userId = req.userId
        const { id } = req.params
        
        const neededDocument = await Document.findById(id);
        
        // If user is autor
        if ( userId == neededDocument.createdBy ) {
            neededDocument.isRecycled = true
            neededDocument.changedAt = new Date();
            neededDocument.save();
        }

        res.status(200).json(neededDocument);
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
