const jwt = require('jsonwebtoken')

module.exports.auth = async (req, res, next) => {
    const token = req.headers.authorization.split(" ")[1]
    if (!token) {
        return res.status(401).json({ error: 'Please authenticate using a valid token' })
    }
    try {
        const data = jwt.verify(token, 'travel')
        req.userId = data?.id
        next()
    } catch (error) {
        res.status(401).json({ error: 'Please authenticate using a valid token' })
    }
}