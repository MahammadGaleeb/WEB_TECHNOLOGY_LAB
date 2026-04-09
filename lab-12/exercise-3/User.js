const mongoose = require('mongoose');

// Schema Definition
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    }
}, {
    timestamps: true
});

// Model Creation
const User = mongoose.model('User', userSchema);

module.exports = User;