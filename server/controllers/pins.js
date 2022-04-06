const { default: mongoose } = require('mongoose')
const Pin = require('../models/Pin')

// Create a Pin
module.exports.createPin = async (req, res) => {
    const pin = req.body
    const newPin = new Pin({ ...pin, creator: req.userId })
    try {
        const savedPin = await newPin.save()
        res.status(201).json(savedPin)
    } catch (error) {
        res.status(409).json(error)
    }
}

// Get all Pins
module.exports.getPins = async (req, res) => {
    try {
        const pins = await Pin.find()
        res.status(200).json(pins)
    } catch (error) {
        res.status(404).json(error)
    }
}

module.exports.updatePin = async (req, res) => {
    const { id } = req.params
    const pin = req.body
    if (!mongoose.Types.ObjectId.isValid(id)) {
        res.status(404).json({ error: "No memory with this id" })
    }
    const updatedPin = await Pin.findByIdAndUpdate(id, pin, { new: true })
    res.json(updatedPin)
}

module.exports.deletePin = async (req, res) => {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No memory with this id' })
    }
    await Pin.findByIdAndRemove(id)
    res.json({ message: 'Memory Deleted Successfully' })
}

module.exports.likePin = async (req, res) => {
    const { id } = req.params
    if (!req.userId) {
        return res.json({ message: 'Unauthenticated' })
    }
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No memory with this id' })
    }
    const pin = await Pin.findById(id)
    const index = pin.likes.findIndex((id) => id === String(req.userId))
    if (index === -1) {
        pin.likes.push(req.userId)
    } else {
        pin.likes = pin.likes.filter((id) => id !== String(req.userId))
    }
    const updatedPin = await Pin.findByIdAndUpdate(id, pin, { new: true })
    res.json(updatedPin)
}