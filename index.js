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

//MONGO_URI _> "mongodb+srv://<USERNAME>:<PASSWORD>@alpha.9j5kqi2.mongodb.net/project-04?retryWrites=true&w=majority&appName=alpha"

// connection
(function connect() {
  console.log("trying to connect... with database!!");
  mongoose
    .connect(MONGO_URI)
    .then((res) => {
      console.log("connected to database!!");
    })
    .catch((err) => console.log(err));
})();

// middlewares
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static("public"));
app.use(cookieParser());
app.use(userAuth);

// views
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// routes
app.use("/", staticRouter);
app.use("/user", userRouter);
app.use("/blogs", restrictUser(["ADMIN", "NORMAL"]), blogRouter);

app.listen(PORT, () => {
  console.log(`listening on PORT: ${PORT}`);
});
