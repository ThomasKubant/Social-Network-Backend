const { Schema, model } = require('mongoose');
const moment = require('moment');

// not 100% sure about if username is referencing the user who created thought
// reactions need work
// make virtual reactionCount that returns reactions.length

const thoughtSchema = new Schema({
    thoughtText: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 280
    },
    createdAt: {
        type: Date,
        default: moment().format('DD MM YYYY hh:mm:ss')
    },
    username: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    reactions: [
        {
            
        }
    ]
})

const Thought = model('Thought', thoughtSchema);

module.exports = { Thought };