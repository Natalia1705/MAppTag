const router = require("express").Router();
const User = require("../models/User");
const Pin = require("../models/Pin");
const bcrypt = require("bcrypt");

//UPDATE
router.put("/:id", async (req, res) => {
  if (req.body.userId === req.params.id) {
    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      req.body.password = await bcrypt.hash(req.body.password, salt);
    }
    try {
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(updatedUser);
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(401).json("Solamente puedes borrar tu cuenta");
  }
});

//DELETE
router.delete("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (user.username === req.body.username) {
      try {
        await Pin.deleteMany({ _id: user._id });
        await user.delete();
        res.status(200).json("usuario eliminado...");
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(401).json("Solamente puedes borrar tu propia cuenta");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
