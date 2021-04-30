const accidentDetail = require('../models/accidentDetailModel')


exports.payClient_post = (req, res) => {
    accidentDetail.deleteOne({ id: req.body.id }, (err, result) => {
        if (err) {
            res.status(500).send(err)
        }
        res.send(result)
    })
}

exports.find_by_IDN_post = (req, res) => {
    accidentDetail.findOne({
        insuranceCompany: req.body.insuranceCompany,
        idn: req.body.idn
    },
        (err, data) => {
            if (err) {
                res.status(500).send(err)
            }
            if (data) {
                res.status(200).send(data)
            }
        })
}

exports.find_by_name_post = (req, res) => {
    accidentDetail.find({
        insuranceCompany: req.body.insuranceCompany,
        $or: [
            { 'firstName': req.body.name },
            { 'middleName': req.body.name },
            { 'surname': req.body.name }]
    },
        (err, data) => {
            if (err) {
                res.status(500).send(err)
            }
            if (data) {
                res.status(200).send(data)
            }
        })
}

exports.find_by_date_post = (req, res) => {
    accidentDetail.find({
        insuranceCompany: req.body.insuranceCompany,
        firstReg: req.body.firstReg
    },
        (err, data) => {
            if (err) {
                res.status(500).send(err)
            }
            if (data) {
                res.status(200).send(data)
            }
        })
}

exports.find_by_accident_type_post = (req, res) => {
    accidentDetail.find({
        insuranceCompany: req.body.insuranceCompany,
        accidentType: req.body.accidentType
    },
        (err, data) => {
            if (err) {
                res.status(500).send(err)
            }
            if (data) {
                res.status(200).send(data)
            }
        })
}