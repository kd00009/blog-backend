const express = require("express");
const {
  getAllBlogsController,
  createBlogController,
  updateBlogController,
  deleteBlogController,
  getBlogByIdController,
  userBlogController,
} = require("../controllers/blogController");

const router = express.Router();

// routes

// get all blog
router.get("/all-blog", getAllBlogsController);

// create blog
router.post("/create-blog", createBlogController);

// update blog
router.put("/update-blog/:id", updateBlogController);

// delete blog
router.delete("/delete-blog/:id", deleteBlogController);

// single blog
router.get("/get-blog/:id", getBlogByIdController);

// get user blog
router.get("/user-blog/:id", userBlogController);

module.exports = router;
