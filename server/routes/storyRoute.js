import express from "express";
import { createStory, getUserStories } from "../controller/storyController.js";
import userAuth from "../middleware/userAuth.js";

const storyRouter = express.Router();

storyRouter.post("/create", userAuth, createStory);
storyRouter.get("/my-stories", userAuth, getUserStories);

export default storyRouter;
