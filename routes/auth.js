const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { User } = require("../models/Todo");
const dotenv = require("dotenv");
const router = express.Router();
const cors = require('cors')

dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET;
const app = express();

app.use(express.json());
app.use(cors())

router.post('/register', async (req, res) => {
  const { username, password } = req.body;

  try {
    if(!username || !password){
      return res.status(404).json({
        msg:"please fill the inputs fields"
      })
    }
    
    // Check if user already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ msg: "User already exists" });
    }

    // Hash the password
    const saltRounds = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Store the new user
    await User.create({
      username,
      password: hashedPassword,
    });

    return res.status(201).json({ msg: "User registered successfully" });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: "Error in registering user" });
  }
});

  

router.post("/login", async (req, res) => {
  const {username,password} = req.body

  try {
    if(!username || !password){
      return res.status(404).json({
        msg:"please fill the inputs fields"
      })
    }

    const user = await User.findOne({ username: username });
    if (!user) {
      return res.status(404).json({
        msg: "Please register the user first, then login",
      });
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return res.status(401).json({
        msg: "Invalid username or password",
      });
    }
    const token = jwt.sign({ username }, JWT_SECRET);
    return res.status(200).json({ token });
  } catch (err) {
    return res.status(500).json({ msg: "Server error", error: err.message });
  }
});


module.exports = router


