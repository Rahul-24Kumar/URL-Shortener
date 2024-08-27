import mongoose from 'mongoose';

const urlSchema = new mongoose.Schema({

    shortCode: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },

    longUrl: {
        type: String,
        required: true,
        trim: true
    }
}, {
    timestamps: true,
    versionKey: false
});


export const Url = mongoose.model('Url', urlSchema);
