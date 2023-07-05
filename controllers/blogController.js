const mongoose = require("mongoose");

// GET ALL BLOG
const Blog = require("../models/blogModel");
const User = require("../models/userModels.js");

exports.getAllBlogsController = async (req, res) => {
  try {
    const blogs = await Blog.find().populate("user");
    if (!blogs) {
      return res
        .status(400)
        .send({ success: false, msg: "Get all blogs failed" });
    }
    res.status(200).send({
      success: true,
      blogs,
      msg: "Get all blogs successfully",
      blogCount: blogs.length,
    });
  } catch (error) {
    res
      .status(400)
      .send({ success: false, msg: "Get all blogs failed", error });
  }
};

exports.createBlogController = async (req, res) => {
  try {
    const { title, description, image, user } = req.body;
    if (!title || !description || !image || !user) {
      return res
        .status(400)
        .send({ success: false, msg: "Please enter all fields" });
    }

    const existinguser = await User.findById(user);
    if (!existinguser) {
      return res
        .status(400)
        .send({ success: false, msg: "User does not exist" });
    }
    const blog = new Blog({ title, description, image, user });
    const session = await mongoose.startSession();
    session.startTransaction();
    await blog.save({ session });
    existinguser.blogs.push(blog);
    await existinguser.save({ session });
    await session.commitTransaction();
    await blog.save();
    res
      .status(201)
      .send({ success: true, msg: "Blog created successfully", blog });
  } catch (error) {
    res
      .status(400)
      .send({ success: false, msg: "Blog creation failed", error });
  }
};

exports.updateBlogController = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedBlog = await Blog.findByIdAndUpdate(
      id,
      { ...req.body },
      { new: true }
    );
    if (!updatedBlog) {
      return res.status(404).send({ success: false, msg: "Blog not found" });
    }
    res.status(200).send({
      success: true,
      msg: "Blog updated successfully",
      updatedBlog,
    });
  } catch (error) {
    res.status(400).send({ success: false, msg: "Blog update failed", error });
  }
};

exports.getBlogByIdController = async (req, res) => {
  try {
    const { id } = req.params;
    const blog = await Blog.findById(id);
    if (!blog) {
      return res.status(404).send({ success: false, msg: "Blog not found" });
    }
    res
      .status(200)
      .send({ success: true, msg: "Blog retrieved successfully", blog });
  } catch (error) {
    res
      .status(400)
      .send({ success: false, msg: "Blog retrieval failed", error });
  }
};

exports.deleteBlogController = async (req, res) => {
  try {
    const blog = await Blog.findByIdAndDelete(req.params.id).populate("user");
    await blog.user.blogs.pull(blog);
    await blog.user.save();
    return res
      .status(200)
      .send({ success: true, msg: "Blog deleted successfully" });
  } catch (error) {
    res
      .status(400)
      .send({ success: false, msg: "Blog deletion failed", error });
  }
};

exports.userBlogController = async (req, res) => {
  try {
    const userblog = await User.findById(req.params.id).populate("blogs");
    if (!userblog) {
      return res.status(404).send({ success: false, msg: "User not found" });
    }
    res.status(200).send({
      success: true,
      msg: "User blogs retrieved successfully",
      userblog,
    });
  } catch (error) {
    res
      .status(400)
      .send({ success: false, msg: "User blogs retrieval failed", error });
  }
};
