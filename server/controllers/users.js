const User = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { validationResult } = require('express-validator')

module.exports.register = async (req, res) => {
    let success = false
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ success, errors: errors.array() })
    }
    const { username, email, password } = req.body
    try {
        let user = await User.findOne({ email })
        if (user) {
            success = false
            return res.status(400).json({ success, error: "Soory a user with this email already exists" })
        }
        user = await User.findOne({ username })
        if (user) {
            success = false
            return res.status(400).json({ success, error: "Sorry a user with this username already exists" })
        }
        const hashedPassword = await bcrypt.hash(password, 12)
        user = await User.create({
            username,
            email,
            password: hashedPassword
        })
        const token = jwt.sign({
            username: user.username,
            id: user._id
        }, 'travel')
        res.status(200).json({ success: true, user, token })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

module.exports.login = async (req, res) => {
    let success = false
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ success, errors: errors.array() })
    }
    const { username, password } = req.body
    try {
        let user = await User.findOne({ username })
        if (!user) {
            return res.status(400).json({ success, error: 'User not found' })
        }
        const comparedPassword = await bcrypt.compare(password, user.password)
        if (!comparedPassword) {
            return res.status(400).json({ success, error: 'Password did not match' })
        }
        const token = jwt.sign({ username: user.username, id: user._id }, 'travel')
        res.status(200).json({ success: true, user, token })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}