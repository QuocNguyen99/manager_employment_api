var mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    mail: {
        type: String,
        required: true,
    },
    idEmployment: {
        type: String,
        required: true,
    },
    roleAdmin: {
        type: Boolean,
        default: Boolean
    },
});

const User = mongoose.model('User', userSchema);

exports.User = User
