const express = require('express')
const router = express.Router()

const accident_detail_controller = require('../controllers/AccidentController')

router.post('/', accident_detail_controller.accident_detail_post)
router.get('/:insuranceCompany', accident_detail_controller.accident_detail_get)


module.exports = router
