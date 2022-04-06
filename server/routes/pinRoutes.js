const router = require('express').Router()

const { createPin, getPins, deletePin, updatePin, likePin } = require('../controllers/pins')
const { auth } = require('../middleware/auth')

router.get("/", getPins)
router.post("/", auth, createPin)
router.patch("/:id", auth, updatePin)
router.delete("/:id", auth, deletePin)
router.patch("/:id/likePin", auth, likePin)
module.exports = router