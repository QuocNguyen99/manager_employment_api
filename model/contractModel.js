var mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const contractSchema = new mongoose.Schema({
    employmentId: {
        type: String,
        required: true,
    },
    createAt: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    descriptionWork: {
        type: String,
        required: true,
    },
    salary: {
        type: String,
        required: true,
    },
    socialInsurance: {
        type: String,
        required: true,
    },
    bonusProject: {
        type: String,
        required: true,
    },
});

const Contract = mongoose.model('Contract', contractSchema);

exports.Contract = Contract
