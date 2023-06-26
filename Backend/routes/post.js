import express from "express";
import { AddNewPost, DeletePost, GetPosts, SinglePost, UpdatePost } from "../controllers/post.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.post("/addPost", isAuthenticated, AddNewPost);
router.get("/getAllPost", isAuthenticated, GetPosts);
router.route("/:id").put(isAuthenticated,UpdatePost).delete(isAuthenticated,DeletePost).get(isAuthenticated,SinglePost);


export default router;