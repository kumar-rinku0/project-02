const { getUser } = require("../services/user");

const userAuth = (req, res, next) => {
  const userCookie = req.cookies?.token;
  if (!userCookie) {
    return next();
  }
  const user = getUser(userCookie);
  req.user = user;
  next();
};

const restrictUser = (role = []) => {
  return function (req, res, next) {
    if (!req.user) {
      return res.redirect("/login");
    }
    if (!role.includes(req.user.role)) {
      return res.end("unathorized...");
    }
    next();
  };
};

module.exports = {
  userAuth,
  restrictUser,
};
