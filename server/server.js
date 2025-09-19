require("dotenv").config()

const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")

// User Auth
const User = require("./models/User")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

const auth = require("./middleware/auth")



const app = express()

// Middleware: parse JSON bodies
app.use(express.json());
// Middleware: enable CORS
app.use(cors());

mongoose.connect(process.env.MONGOURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

app.get("/", (req, res) => {
    res.send("Api Running")
})

app.get("/api/protected", auth, (req, res) => {
  res.json({message: `Welcome, your user ID is ${req.user.userId}!`})
})


app.post("/api/register", async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({message: "Please Enter All Required Fields"})
  }

  const userExists = await User.findOne({email});

  if (userExists) {
    return res.status(400).json({message: "User already exists."})
  }

  const hashedPassword = await bcrypt.hash(password, 10)
  
  const user = new User({ name, email, hashedPassword})
  await user.save()

  res.status(201).json({message: "User Registered Successfully"})
})

app.post("/api/login", async (req, res) => {
  const {email, password} = req.body

  if (!email || !password) {
    return res.status(400).json({message: "Please enter all fields"})
  }

  const user = await User.findOne({email})
  if (!user) {
    return res.status(400).json({message: "Invalid Credentials"})
  }

  const isMatch = await bcrypt.compare(password, user.password)
  if (!isMatch) {
    return res.status(400).json({message: "Invalid Credentials"})
  }

  // JWT Token
  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

  res.json({
    token,
    user: { id: user._id, name: user.name, email: user.email }
  });

})

app.listen(5000, () => {
    console.log("Server Running on Port 5000")
})