const { Schema, model, Types } = require('mongoose');
const dateFormat = require('date-and-time');
const ReactionSchema = require('./Reaction');


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
            get: createdAtVal => dateFormat.format(createdAtVal,'YYYY/MM/DD HH:mm:ss')
        },
        reaction: ReactionSchema,
    },
    {
        toJSON: {
            getters: true,
            virtuals: true
        },
        id: false
    }
)



//reactionCount Virtual
ThoughtSchema.virtual("reactionCount").get(function () {
    return this.reaction?.length;
  });

const Thought = model('Thought', ThoughtSchema)

module.exports = Thought