const { Schema, model } = require('mongoose');

const userSchema = new Schema(
    {
        userId: {
            type: Schema.Types.Objectid,
            default: () => new Types.Objectid(),
        },
        userName: {
            type: String,
            unique: true,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            match: /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/,
        },
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Thought',
            },
        ],
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User',
            },
        ],
        toJSON: {
            virtuals: true,
        },
        id: false, //what is this id:false?
    },
);

userSchema
    .virtual('friendCount')
    //getter
    .get(function () {
        return this.friends.length;
    });

const User = model('User', userSchema);

module.exports = User;