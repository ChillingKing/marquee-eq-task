const mongoose = require('mongoose')

const companySchema = new mongoose.Schema({
    cin: {
        type: String,
    },
    name: {
        type: String,
    }
})

const Company = mongoose.model('Company', companySchema)
module.exports = Company