const { Schema, model, Types } = require('mongoose');
const dateFormat = require('../utils/dateFormat');


//Thought Schema
const ThoughtSchema = new Schema(
    {
        
        userName: {
            type: String,
            required: true,
            trim: true
        },
        thoughtText: {
            type: String,
            required: 'Enter Thoughts here',
            minlength: 1,
            maxlength: 280
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: createdAtVal => dateFormat(createdAtVal)
        },
        reaction: [ReactionSchema]
    },
    {
        toJSON: {
            getters: true,
            virtuals: true
        },
        id: false
    }
)

//Reactions Schema
const reactionSchema = new Schema(
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
            get: createdAtVal => dateFormat(createdAtVal)
        }
    },
    {
        toJSON: {
            getters: true
        }
    }
)

//reactionCount Virtual
ThoughtSchema.virtual("reactionCount").get(function () {
    return this.reaction.length;
  });

const Thought = model('Thought', ThoughtSchema)

module.exports = Thought