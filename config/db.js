const mongoose = require("mongoose");

const connectdb = async () => {
  const MONGO_URL =
    "mongodb+srv://disojakaran:karan@cluster0.pkz8neb.mongodb.net/";
  try {
    await mongoose.connect(MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB Connected");
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

module.exports = connectdb;
