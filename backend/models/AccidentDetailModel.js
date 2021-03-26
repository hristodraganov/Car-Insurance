const mongoose = require('mongoose')

const accidentSchema = {
    id: String,
    insuranceCompany: String,
    firstName: String,
    middleName: String,
    surname: String,
    idn: Number,
    iban: String,
    dlno: Number,
    vehicleType: String,
    viExpireDate: String,
    regPlate: String,
    firstReg: String,
    yearOfProduction: Number,
    brand: String,
    model: String,
    color: String,
    accidentAddress: String,
    accidentType: String
}

const accidentDetail = mongoose.model('accidentDetail', accidentSchema)

module.exports = accidentDetail