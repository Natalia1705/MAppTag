const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const authRoute = require("./routes/auth");
const userRoute = require("./routes/users");
const pinRoute = require("./routes/pins");

dotenv.config();
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Conneted to MongoDB");
  })
  .catch((err) => console.log(err));

// Routes
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/pins", pinRoute);

PORT = 8800;
app.listen(PORT, () => {
  console.log(`Server is running on Port ${PORT}`);
});
