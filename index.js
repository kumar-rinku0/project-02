require("dotenv").config();

const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");

const staticRouter = require("./routes/staticRoutes");
const userRouter = require("./routes/user");
const blogRouter = require("./routes/blog");

const { userAuth, restrictUser } = require("./middlewares/user");

const app = express();
const PORT = process.env.PORT;
const MONGO_URI = process.env.MONGO_URI;

// connection
(function connect() {
  console.log("trying to connected with database!!");
  mongoose
    .connect(MONGO_URI)
    .then((res) => {
      console.log("connected to database!!");
    })
    .catch((err) => console.log(err));
})();

// views
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

// middlewares
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.resolve("./public")));
app.use(cookieParser());
app.use(userAuth);

// routes
app.use("/", staticRouter);
app.use("/user", userRouter);
app.use("/blog", restrictUser(["ADMIN", "NORMAL"]), blogRouter);

app.listen(PORT, () => {
  console.log("listening on PORT : 8000");
});
