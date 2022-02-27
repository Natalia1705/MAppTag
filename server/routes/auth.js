const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const { getTemplate, sendEmail } = require("../utils/mail");

// REGISTER
router.post("/register", async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    //create new User
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
    });
    //send mail
    const username = newUser.username;
    const template = getTemplate(username);
    const email = newUser.email;
    await sendEmail(email, template);

    //save new user
    const user = await newUser.save();
    res.status(200).json(user._id);
  } catch (error) {
    res.status(500).json(error);
  }
});

// LOGIN
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    !user && res.status(400).json("Contraseñao usuario incorrecto");

    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    !validPassword && res.status(400).json("Contraseñao usuario incorrecto");

    res.status(200).json({ _id: user._id, username: user.username });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
