const { User } = require("../models/user");
const { setUser } = require("../services/user");

const handlesignUP = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const user = await User.create({
      username: username,
      email: email.trim(),
      password: password.trim(),
    });
    console.log(user);

    return res.redirect("/login");
  } catch (err) {
    console.log("USER_CONTROLLER", err);
  }
};
const handleLogin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.correctPassword(email, password);
    if (user.msg) {
      return res.json(user);
    }
    const token = setUser(user);
    res.cookie("token", token);
    return res.redirect("/");
  } catch (err) {
    console.log("USER_CONTROLLER", err);
  }
};

const handleLogout = (req, res) => {
  return res.clearCookie("token").redirect("/");
};

module.exports = {
  handleLogin,
  handlesignUP,
  handleLogout,
};
