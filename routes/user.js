const { Router } = require("express");
const {
  handlesignUP,
  handleLogin,
  handleLogout,
} = require("../controllers/user");

const router = Router();

router.post("/signup", handlesignUP);

router.post("/login", handleLogin);

router.get("/logout", handleLogout);

module.exports = router;
