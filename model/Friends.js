import mongoose from 'mongoose';

const friendSchema = new mongoose.Schema({
    followNow: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    byMe: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, {
    timestamps: true
});

const Friends = mongoose.model('Friends', friendSchema);

export default Friends;