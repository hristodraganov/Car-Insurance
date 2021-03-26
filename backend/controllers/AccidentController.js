const accidentDetail = require('../models/accidentDetailModel')


//post form data from client
exports.accident_detail_post = (req, res) => {
        const formData = req.body
        const accidentDetailRecord = new accidentDetail()
        accidentDetailRecord.id = formData.id
        accidentDetailRecord.insuranceCompany = formData.insuranceCompany
        accidentDetailRecord.firstName = formData.firstName
        accidentDetailRecord.middleName = formData.middleName
        accidentDetailRecord.surname = formData.surname
        accidentDetailRecord.idn = formData.idn
        accidentDetailRecord.iban = formData.iban
        accidentDetailRecord.dlno = formData.dlno
        accidentDetailRecord.vehicleType = formData.vehicleType
        accidentDetailRecord.viExpireDate = formData.viExpireDate
        accidentDetailRecord.regPlate = formData.regPlate
        accidentDetailRecord.firstReg = formData.firstReg
        accidentDetailRecord.yearOfProduction = formData.yearOfProduction
        accidentDetailRecord.brand = formData.brand
        accidentDetailRecord.model = formData.model
        accidentDetailRecord.color = formData.color
        accidentDetailRecord.accidentAddress = formData.accidentAddress
        accidentDetailRecord.accidentType = formData.accidentType

        accidentDetailRecord.save()
}
exports.accident_detail_get = (req, res) => {
        accidentDetail.find({ insuranceCompany: req.params.insuranceCompany }, (err, data) => {
                if (err) {
                        res.send(500)
                } else {
                        res.status(200).send(data)
                }
        })
}
