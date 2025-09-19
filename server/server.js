require("dotenv").config()

const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")

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

app.listen(5000, () => {
    console.log("Server Running on Port 5000")
})