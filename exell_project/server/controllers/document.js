import express from 'express';
import mongoose from 'mongoose';

import User from '../models/user.js';

const router = express.Router();

export const getDocument = async (req, res) => { 
    try {
        const userId = req.userId
        const userState = await User.findById(userId);
        const { id } = req.params;
        console.log(userId + '/' + id);

        const documents = user.documents;

        console.log(userState)
                
        res.status(200).json(userState);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

// export const createDocument = async (req, res) => { 
//     try {
//         const userId = req.userId
//         const newDocument = req.body;
//         // console.log(newDocument);
        
//         let newUser = await User.findById(userId);
//         // console.log(newUser);

//         await newUser.documents.push({
//             name: newDocument.name, 
//             createdAt: new Date(),
//             changedAt: new Date(),
//         })
//         // console.log(newUser);

//         const userState = await User.findByIdAndUpdate(userId, newUser, { new: true });
        
//         // console.log(userState)
                
//         res.status(200).json(userState);
//     } catch (error) {
//         res.status(404).json({ message: error.message });
//     }
// }

// export const deleteDocument = async (req, res) => { 
//     try {
//         const userId = req.userId
//         const { id } = req.params;
//         // console.log(id);
        
//         let newUser = await User.findOne({_id: userId });
//         let newDocumentList = newUser.documents.filter( (doc)=> doc._id != id )
//         newUser.documents = newDocumentList
//         // console.log(newUser);

//         const userState = await User.findByIdAndUpdate(userId, newUser, { new: true });
                
//         // console.log(userState)

//         res.status(200).json(userState);
//     } catch (error) {
//         res.status(404).json({ message: error.message });
//     }
// }

// export const updatePost = async (req, res) => {
//     const { id } = req.params;
//     const { title, message, creator, selectedFile, tags } = req.body;
    
//     if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

//     const updatedPost = { creator, title, message, tags, selectedFile, _id: id };

//     await PostMessage.findByIdAndUpdate(id, updatedPost, { new: true });

//     res.json(updatedPost);
// }
