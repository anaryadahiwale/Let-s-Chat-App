import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const conversationSchema = new Schema({
    participants: [
        {type: Schema.Types.ObjectId, ref: 'User'}
    ],
}, {
    timestamps: true,
});

const Conversation = mongoose.model('Conversation', conversationSchema);

export default Conversation