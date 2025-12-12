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

// Get single story by ID
export const getStoryById = async (req, res) => {
    try {
        const { id } = req.params;

        // TEMPORARY: Read from mock JSON file
        const fs = await import('fs');
        const path = await import('path');
        const { fileURLToPath } = await import('url');
        const __filename = fileURLToPath(import.meta.url);
        const __dirname = path.dirname(__filename);
        const mockPath = path.join(__dirname, '..', 'mockStories.json');
        const mockData = JSON.parse(fs.readFileSync(mockPath, 'utf-8'));

        const story = mockData.find(s => s._id === id);

        if (!story) {
            return res.json({ success: false, message: "Story not found" });
        }

        return res.json({ success: true, story });

    } catch (error) {
        return res.json({ success: false, message: error.message });
    }
}

// Get all stories (public)
export const getAllStories = async (req, res) => {
    try {
        // TEMPORARY: Read from mock JSON file
        const fs = await import('fs');
        const path = await import('path');
        const { fileURLToPath } = await import('url');
        const __filename = fileURLToPath(import.meta.url);
        const __dirname = path.dirname(__filename);
        const mockPath = path.join(__dirname, '..', 'mockStories.json');
        const mockData = JSON.parse(fs.readFileSync(mockPath, 'utf-8'));

        return res.json({ success: true, stories: mockData });
    } catch (error) {
        return res.json({ success: false, message: error.message });
    }
}
