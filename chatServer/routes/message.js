import express from 'express'
import Conversation from '../models/Conversation.js'
import Message from '../models/Message.js'
import verifyUser from '../middleware/verifyUser.js'
import { GetReceiverSocketId, io } from '../socket/socket.js'

const router = express.Router()

router.get('/read/:receiverId', verifyUser, async(req, res) => {
    try {
        const {receiverId} = req.params;
        const senderId = req.user._id;

        const conversation = await Conversation.findOne({
            participants: {$all: [senderId, receiverId]}
        });

        if(!conversation) {
            return res.status(404).json({message: 'Not Found'})
        }

        const messages = await Message.find({
            conversationId: conversation._id
        }).sort({createdAt: 1})

        return res.status(200).json(messages)

    } catch (error) {
        console.log(error)
        return res.status(500).json({msg: error}) 
    }
})

router.post('/send/:receiverId', verifyUser, async(req, res) => {
    try {
        const {receiverId} = req.params;
        const senderId = req.user._id;
        const {content} = req.body;

        /*if (!content) {
            return res.status(400).json({ error: 'Content is required' });
        }*/

    let conversation = await Conversation.findOne({
        participants: {$all: [senderId, receiverId]}
    });

    if(!conversation) {
        conversation = new Conversation({
            participants: [senderId, receiverId]
        })
        await conversation.save();
    }

    const newMessage = new Message({
        conversationId: conversation._id,
        sender: senderId,
        content: content,
        createdAt: new Date()

    });

    await newMessage.save();

    const receiverSocketId = GetReceiverSocketId(receiverId)
    
    if(receiverSocketId) {
        io.to(receiverSocketId).emit('newMessage', newMessage)
    }

    return res.json(newMessage)
    /*res.status(201).json({
        message: 'Message sent successfully!',
        data: newMessage
    });*/

    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
    

})

export default router;