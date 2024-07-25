const { Router } = require("express");
const router = Router();
const multer = require("multer");
const { hanleBlogUploads, handleBlogs } = require("../controllers/blog");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/uploads");
  },
  filename: function (req, file, cb) {
    const filename = `${Date.now()}-${file.originalname}`;
    cb(null, filename);
  },
});
const upload = multer({ storage: storage });

router.post("/newblog", upload.single("file"), hanleBlogUploads);

router.get("/", handleBlogs);

module.exports = router;
