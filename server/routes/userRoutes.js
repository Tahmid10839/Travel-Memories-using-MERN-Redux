const router = require('express').Router()
const { body } = require('express-validator')
const { register, login } = require('../controllers/users')

router.post('/register', [
    body('username', 'Username must be at least 3 characters').isLength({ min: 3 }),
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password must be at least 6 characters').isLength({ min: 6 })
], register)
router.post('/login', [
    body('username', 'Username must be at least 3 characters').isLength({ min: 3 }),
    body('password', 'Password can not be blank').exists()
], login)

module.exports = router