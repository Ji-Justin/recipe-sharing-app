const express = require('express')
const app = express()

app.get('/', (req, res) => {
    res.send("Hello")
})

const userRouter = require('./routes/userRoutes')

app.use('/users', userRouter)

app.listen(3000)