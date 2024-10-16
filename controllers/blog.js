const Blog = require("../models/blog");

const hanleBlogUploads = async (req, res) => {
  const { title, body } = req.body;
  const blog = await Blog.create({
    title: title,
    body: body,
    imageURL: `/uploads/${req.file.filename}`,
    createdBy: req.user._id,
  });
  return res.redirect("/");
};

const handleBlogs = async (req, res) => {
  const blogs = await Blog.find({ createdBy: req.user._id });
  return res.render("home", {
    user: req.user,
    blogs,
  });
};

module.exports = {
  hanleBlogUploads,
  handleBlogs,
};
