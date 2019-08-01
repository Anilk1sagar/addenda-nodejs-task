import mongoose from 'mongoose';

// UserRefreshToken Schema
const UserRefreshTokenSchema = mongoose.Schema({
    uid: {
        type: String,
        required: true
    },
    token: {
        type: String,
        required: true
    },
    isExpired: {
        type: Boolean,
        required: true
    }
});

const UserRefreshToken = module.exports = mongoose.model('UserRefreshToken', UserRefreshTokenSchema);