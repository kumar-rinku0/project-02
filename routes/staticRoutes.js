const { Router } = require("express");
const { restrictUser } = require("../middlewares/user");
const Blog = require("../models/blog");

const router = Router();

router.get("/", async (req, res) => {
  const blogs = await Blog.find({});
  return res.render("home", {
    user: req.user,
    blogs: blogs,
  });
});

router.get("/newblog", (req, res) => {
  return res.render("createblog", {
    user: req.user,
  });
});

router.get("/signup", (req, res) => {
  return res.render("signup");
});

router.get("/login", (req, res) => {
  return res.render("login");
});

module.exports = router;
