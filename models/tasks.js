const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const taskSchema = mongoose.Schema({
    file_name: {
        type: String,
        required: true
    },
    task_id: {
        type: String,
        required: true,
        unique: true
    },
    file_url: {
        type: String,
        required: true
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    size_of_file: Number,
    status: {
        type: String,
        enum: ['pending', 'processing', 'completed', 'failed'],
        default: 'pending'
    }
},{ timestamps: true })


module.exports = mongoose.model('Task', taskSchema)