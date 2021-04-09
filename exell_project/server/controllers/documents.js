import express from 'express';
import mongoose from 'mongoose';

import User from '../models/user.js';
import Document from '../models/document.js';

const router = express.Router();

export const getDocuments = async (req, res) => { 
    try {

        const userId = req.userId
        const userDocuments = await Document.find({createdBy: userId})

        // console.log(userDocuments)
                
        res.status(200).json(userDocuments);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const createDocument = async (req, res) => { 
    try {
        const userId = req.userId
        const newDocumentName = req.body.name;
        const newDocument = {
            name: newDocumentName, 
            createdBy: userId,
        }

        const newDoc = await Document.create(newDocument);
        
        // console.log(userState2)
        // 
        // let newUser = await User.findById(userId);
        // 
        // await newUser.documents.push({
        //     name: newDocument.name, 
        //     createdAt: new Date(),
        //     changedAt: new Date()
        // })
        // console.log(newUser);
        // 
        // const userState = await User.findByIdAndUpdate(userId, newUser, { new: true });
        // 
        // console.log(userState)
                
        res.status(200).json(newDoc);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const deleteDocument = async (req, res) => { 
    try {
        const userId = req.userId
        const { id } = req.params
        // console.log(id);

        // If user is autor or a friend with right to delete
        const neededDocument = await Document.findById(id);

        if ( userId = neededDocument.createdBy ) {
            console.log('Deleted by user');
        } else if ( neededDocument.rightsAccess.delete.includes(userId) ) {
            console.log('Deleted by friend')
        }

        
        let newUser = await User.findOne({_id: userId });
        let newDocumentList = newUser.documents.filter( (doc)=> doc._id != id );
        newUser.documents = newDocumentList
        // console.log(newUser);

        const userState = await User.findByIdAndUpdate(userId, newUser, { new: true });
                
        // console.log(userState)

        res.status(200).json(userState);
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
