const mongoose = require("mongoose");

const PinSchema = new mongoose.Schema(
  {
    username: { type: String, required: false },
    title: { type: String, required: false, min: 3 },
    desc: { type: String, required: false, min: 3 },
    rating: { type: Number, required: false, min: 0, max: 5 },
    img: { type: String, required: false },
    lat: { type: Number, required: false },
    long: { type: Number, required: false },
    img: { type: String, required: false },
    cloudinary_id: { type: String, required: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Pin", PinSchema);
