const express = require("express");
const router = express.Router();
// const Image = require('../models/image');
const {
  createImage,
  getImagesByUser,
  deleteImage,
} = require("../controllers/image");
const authenticateToken = require("../middleware/auth-token");
const multer = require("multer");
const path = require("path");

const imagesDirectory = path.join(__dirname, "../images");
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, imagesDirectory);
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "_" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({ storage: storage });

router.post(
  "/gallery",
  authenticateToken,
  upload.single("file"),
  async (req, res) => {
    console.log("hello");
    console.log(req.file);
    console.log(req.body.desc);
    //   console.log(req.body);

    const imagename = req.file.filename;
    const description = req.body.desc;
    const userId = req.user._id; // Assuming you store user info in req.user

    try {
      const image = await createImage(userId, imagename, description);
      res.status(201).json(image);
    } catch (error) {
      console.log("hello here");
      res.status(500).json({ message: error.message });
    }
  }
);

router.get("/gallery", authenticateToken, async (req, res) => {
  const userId = req.user;

  try {
    const images = await getImagesByUser(userId);
    // console.log(images);
    res.status(200).json(images);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.delete("/gallery/:id", authenticateToken, async (req, res) => {
  console.log(req.params.id);
  const imageId = req.params.id;
  const userId = req.user._id;
  console.log("hello0");
  try {
    console.log("hello1");
    const result = await deleteImage(imageId, userId);
    console.log("hello2");
    // if (result) {
    //     console.log("hello3");
    //   res.status(200).json({ message: "Deleted successfully" });
    //   console.log("hello4");
    // } else {
    //   res.status(404).json({ message: "Image not found" });
    // }
    if (result.success) {
      res.status(200).json({ message: "Image deleted successfully" });
    } else {
      res.status(404).json({ message: result.message });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
