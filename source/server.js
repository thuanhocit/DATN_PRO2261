const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// ✅ Kết nối MongoDB
mongoose.connect("mongodb://localhost:27017/cinebook", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// ✅ Tạo schema User
const UserSchema = new mongoose.Schema({
  username: { type: String, unique: true },
  password: String,
});

const User = mongoose.model("User", UserSchema);

// Đăng ký
app.post("/register", async (req, res) => {
  try {
    const { username, password } = req.body;
    const hashed = await bcrypt.hash(password, 10);

    const user = new User({ username, password: hashed });
    await user.save();

    res.json({ message: "User registered successfully" });
  } catch (err) {
    res.status(400).json({ error: "User already exists" });
  }
});

// Đăng nhập
app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });

  if (!user) return res.status(400).json({ error: "User not found" });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).json({ error: "Invalid credentials" });

  // tạo token JWT
  const token = jwt.sign({ id: user._id }, "secret123", { expiresIn: "1h" });

  res.json({ message: "Login successful", token });
});

app.listen(5000, () => console.log("Server running on http://localhost:5000"));
