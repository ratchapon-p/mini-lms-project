const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const usersRouter = require('./routes/usersRouter')
const courseRouter = require('./routes/courseRouter')
const courseSectionRouter = require('./routes/courseSection')
dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

//db connect
mongoose.connect(process.env.MONGO_URL).then(() => console.log('db connected')).catch(e=>console.log(e))

app.use(express.json())

//?---------------- ROUTER ----------------------------------
app.use('/', usersRouter)
app.use('/', courseRouter)
app.use('/', courseSectionRouter)

//?----------------------------------------------------------

app.listen(PORT, () =>{
    console.log(`server is running on port ${PORT}`);
})