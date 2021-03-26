const express = require('express')
const router = express.Router()

const query_controller = require('../controllers/QueryController')

router.post('/id', query_controller.payClient_post)
router.post('/idn', query_controller.find_by_IDN_post)
router.post('/name', query_controller.find_by_name_post)
router.post('/date', query_controller.find_by_date_post)
router.post('/accidentType', query_controller.find_by_accident_type_post)

module.exports = router