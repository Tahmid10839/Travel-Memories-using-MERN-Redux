const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const pinRoutes = require('./routes/pinRoutes')
const userRoutes = require('./routes/userRoutes')
const cors = require('cors')

const app = express()
dotenv.config()

app.use(cors())

app.use(express.json())

app.use('/api/pins', pinRoutes)
app.use('/api/user', userRoutes)

app.get('/', (req, res) => {
    res.send('Hello to Travel Memories API')
})

const PORT = process.env.PORT;

mongoose.connect(process.env.CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
    app.listen(PORT, () => {
        console.log(`Server is listening on port: ${PORT}`);
    })
}).catch((error) => {
    console.log(error);
})