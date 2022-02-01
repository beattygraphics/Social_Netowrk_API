const { Schema, model, Types } = require('mongoose');
const dateFormat = require('date-and-time');

//Reactions Schema
const Reaction = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId(),
        },
        reactionBody: {
            type: String,
            required: 'Enter Reaction Here',
            maxlength: 280
        },
        userName: {
            type: String,
            required: 'Enter Your Name Here',
            trim: true
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: createdAtVal => dateFormat(createdAtVal).format(now,'YYYY/MM/DD HH:mm:ss')
        }
    },
    {
        toJSON: {
            getters: true
        },
        
    }
)

// const Reaction = model('Reaction', ReactionSchema)

module.exports = Reaction