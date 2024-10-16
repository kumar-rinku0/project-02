const { Router } = require("express");
const { restrictUser } = require("../middlewares/user");
const Blog = require("../models/blog");

const router = Router();

router.get("/", async (req, res) => {
  const blogs = await Blog.find({});
  return res.render("home.ejs", {
    user: req.user,
    blogs: blogs,
  });
});

router.get("/blog/:blogId", async (req, res) => {
  const { blogId } = req.params;
  console.log(req.params);
  const blog = await Blog.findById(blogId);
  return res.render("blog.ejs", { user: req.user, blog: blog });
});

router.get("/newblog", (req, res) => {
  return res.render("createblog.ejs", {
    user: req.user,
  });
});

router.get("/signup", (req, res) => {
  return res.render("signup.ejs");
});

router.get("/login", (req, res) => {
  return res.render("login.ejs");
});

module.exports = router;
