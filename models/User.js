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
            
        } 
    }
)