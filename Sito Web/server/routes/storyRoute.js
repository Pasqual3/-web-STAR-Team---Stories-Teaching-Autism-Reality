import express from "express";
import { createStory, getUserStories, getStoryById, getAllStories } from "../controller/storyController.js";
import { userAuth } from "../middleware/userAuth.js";

const storyRouter = express.Router();

storyRouter.get("/all", getAllStories); // Public route
storyRouter.post("/create", userAuth, createStory);
storyRouter.get("/my-stories", userAuth, getUserStories);
storyRouter.get("/:id", userAuth, getStoryById);

export default storyRouter;
