const { Schema, model } = require('mongoose');
// const User = require('./User');

const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            minLength: 1,
            maxLength: 280,
        },
        createdAt: {
            type: Date,
            default: Date.now,

        },
        username: { //user that created this thought
            type: String,
            required: true,
        },
        reactions: [reactionSchema],
    },
    {
        toJSON: {
            getters: true,
        },
        id: false,
    }
);

thoughtSchema
    .virtual('reactCount')
    //getter
    .get(function () {
        return this.reactions.length;
    });

const Thought = model('thought', thoughtSchema);
module.exports = Thought;