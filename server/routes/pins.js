const router = require("express").Router();
const cloudinary = require("../utils/cloudinary");
const upload = require("../utils/multer");
const Pin = require("../models/Pin");

// CREATE A PIN
// router.post("/", upload.single("image"), async (req, res) => {

router.post("/", async (req, res) => {
  try {
    // const result = await cloudinary.uploader.upload(req.file.path);
    const newPin = new Pin({
      username: req.body.username,
      title: req.body.title,
      desc: req.body.desc,
      rating: req.body.rating,
      lat: req.body.lat,
      long: req.body.long,
      // img: result.secure_url,
      // cloudinary_id: result.public_id,
    });
    const savedPin = await newPin.save();
    res.status(200).json(savedPin);
  } catch (error) {
    res.status(500).json(error);
  }
});

// GET ALL
router.get("/", async (req, res) => {
  try {
    const pins = await Pin.find();
    res.status(200).json(pins);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    let pin = await Pin.findById(req.params.id);
    await cloudinary.uploader.destroy(pin.cloudinary_id);
    await user.remove();
    res.json(pin);
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
