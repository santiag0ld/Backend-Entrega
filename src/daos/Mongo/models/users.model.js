const  {Schema, model } = require('mongoose')

const usersSchema = new Schema({
    first_name: {
        type: String,
        required: true
    },
    last_name: String,
    email: {
        type: String,
        required: true,
        uniqued: true
    },
    atCreated: {
        type: Data,
        default: Date()
    }
})

exports.userModel = model('users', usersSchema)


