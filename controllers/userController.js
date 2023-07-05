const User = require("../models/userModels");
const bcrypt = require("bcrypt");

exports.registerController = async (req, res) => {
  try {
    const { username, password, email } = req.body;
    if (!username || !password || !email) {
      return res
        .status(400)
        .send({ success: false, msg: "Please enter all fields" });
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .send({ success: false, msg: "User already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, password: hashedPassword, email });
    await user.save();
    res
      .status(201)
      .send({ success: true, msg: "User registered successfully", user });
  } catch (error) {
    res.status(400).send({ success: false, msg: "Registration failed", error });
  }
};

// Rest of the code remains the same

// get all usrer

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).send({
      success: true,
      users,
      msg: "Get all users successfully",
      userCount: users.length,
    });
  } catch (error) {
    res
      .status(400)
      .send({ success: false, msg: "Get all users failed", error });
  }
};

exports.loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log("Entered email:", email);
    console.log("Entered password:", password);

    if (!email || !password) {
      console.log("Invalid fields: Email or password is missing");
      return res
        .status(400)
        .send({ success: false, msg: "Please enter all fields" });
    }

    const user = await User.findOne({ email });
    console.log("Retrieved user:", user);

    if (!user) {
      console.log("User does not exist");
      return res
        .status(400)
        .send({ success: false, msg: "User does not exist" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    console.log("Password match:", isMatch);

    if (!isMatch) {
      console.log("Invalid password");
      return res
        .status(400)
        .send({ success: false, msg: "Invalid credentials" });
    }

    console.log("Login successful");
    res.status(200).send({ success: true, msg: "Login successfully", user });
  } catch (error) {
    console.log("Login failed:", error);
    res.status(400).send({ success: false, msg: "Login failed", error });
  }
};
