const express = require('express')
const router = express.Router()

const image_upload_controller = require('../controllers/ImageUploadController')

router.post('/:id/:imageType', image_upload_controller.image_upload_post)

module.exports = router