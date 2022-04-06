const mongoose = require('mongoose')

const pinSchema = new mongoose.Schema({
    creator: {
        type: String,
    },
    username: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        min: 3,
        required: true,
    },
    desc: {
        type: String,
        min: 3,
        required: true,
    },
    rating: {
        type: Number,
        min: 0,
        max: 5,
        required: true,
    },
    lat: {
        type: Number,
        required: true,
    },
    long: {
        type: Number,
        required: true,
    },
    likes: {
        type: [String],
        default: []
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('Pin', pinSchema)