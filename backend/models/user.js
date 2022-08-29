const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email:{
        unique: true,
        required: true,
        type: String
    },
    password: {
        required: true,
        type: String
    },
    token: {
        type: String
    }
})

module.exports = mongoose.model("User", userSchema)