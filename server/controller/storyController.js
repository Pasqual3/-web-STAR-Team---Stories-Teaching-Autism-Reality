import { storyModel } from "../models/storyModel.js";

// Create a new story
export const createStory = async (req, res) => {
    try {
        const { userId, title, paragraphs } = req.body;

        if (!title || !paragraphs) {
            return res.json({ success: false, message: "Title and content are required" });
        }

        const newStory = new storyModel({
            userId,
            title,
            paragraphs
        });

        await newStory.save();

        return res.json({ success: true, message: "Story created successfully" });

    } catch (error) {
        return res.json({ success: false, message: error.message });
    }
}

// Get all stories for a user
export const getUserStories = async (req, res) => {
    try {
        const { userId } = req.body; // userId is injected by the auth middleware

        const stories = await storyModel.find({ userId }).sort({ createdAt: -1 });

        return res.json({ success: true, stories });

    } catch (error) {
        return res.json({ success: false, message: error.message });
    }
}
