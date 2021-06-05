const { Schema, model } = require('mongoose');
const moment = require('moment');

// not 100% sure about reactionId default

const reactionSchema = new Schema({
    reactionId: {
        type: Schema.Types.ObjectId,
        default: Schema.Types.ObjectId,
    },
    reactionBody: {
        type: String,
        required: true,
        maxlength: 280
    },
    username: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: moment().format('DD MM YYYY hh:mm:ss')
    }
})