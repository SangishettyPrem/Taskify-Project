const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UsersSchema = new Schema({
    name: {
        type: String
    }, email: {
        type: String
    }, password: {
        type: Object
    },
});

const UserModel = mongoose.model('Users', UsersSchema);

module.exports = UserModel;