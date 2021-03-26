const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const fileUpload = require('express-fileupload')

const indexRouter = require('./routes/index')
const imageUploadRouter = require('./routes/imageUpload')
const queryRouter = require('./routes/query')
const MONGO_URI = 'mongodb+srv://ivnvdiyan:Diyan123!@carinsurance.umzcp.mongodb.net/CarInsurance?retryWrites=true&w=majority'
//gmail: ivnvdiyan@gmail.com
//pass: Diyan123!

mongoose.connect(MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true})

const app = express()

app.use(cors())
app.use(express.json())
app.use('/images', express.static(__dirname + '/images'))
app.use(fileUpload())
app.use('/', indexRouter)
app.use('/upload', imageUploadRouter)
app.use('/query', queryRouter)
const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log('running on ' + PORT)
})