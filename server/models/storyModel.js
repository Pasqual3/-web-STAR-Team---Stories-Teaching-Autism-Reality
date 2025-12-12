import mongoose from "mongoose";

const storySchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true },
    title: { type: String, required: true },
    paragraphs: [{
        text: { type: String },
        media: { type: String }, // URL to the media
        mediaType: { type: String, enum: ['image', 'video', 'audio', null] },
        color: { type: String, default: 'bg-white' },
        animation: { type: String, default: 'none' }
    }],
}, { timestamps: true });

export const storyModel = mongoose.models.story || mongoose.model('story', storySchema);
