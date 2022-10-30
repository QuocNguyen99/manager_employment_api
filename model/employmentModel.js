var mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const employmentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    birthday: {
        type: String,
        required: true,
    },
    sex: {
        type: Boolean,
        default: false
    },
    email: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    joinDate: {
        type: String,
        required: true,
    },
    roleEmployment: {
        type: String,
        required: true,
    },
});

const Employment = mongoose.model('Employment', employmentSchema);

exports.Employment = Employment
