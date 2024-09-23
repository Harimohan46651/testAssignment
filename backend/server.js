const express = require("express")
const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const cors = require("cors")
require("dotenv").config()

const app = express()
app.use(cors())
app.use(express.json())

const PORT = process.env.PORT || 5000
const MONGO_URI = process.env.MONGO_URI
const JWT_SECRET = process.env.JWT_SECRET

mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err))

const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: { type: String, unique: true },
  mobile: String,
  age: Number,
  password: String,
})

const User = mongoose.model("User", userSchema)

const authenticate = (req, res, next) => {
  const token = req.header("Authorization").replace("Bearer ", "")
  try {
    const decoded = jwt.verify(token, JWT_SECRET)
    req.user = decoded
    next()
  } catch (error) {
    res.status(401).send({ message: "Authentication failed" })
  }
}

// route to signup: /signup
app.post("/signup", async (req, res) => {
  const { firstName, lastName, email, mobile, age, password } = req.body
  try {
    const hashedPassword = await bcrypt.hash(password, 10)
    const user = new User({ firstName, lastName, email, mobile, age, password: hashedPassword })
    await user.save()
    res.status(201).send({ message: "User registered successfully" })
  } catch (error) {
    res.status(400).send({ message: "Error in registration", error })
  }
})

// route to login : /login
app.post("/login", async (req, res) => {
  const { email, password } = req.body
  try {
    const user = await User.findOne({ email })
    if (!user) return res.status(400).send({ message: "Invalid credentials" })

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) return res.status(400).send({ message: "Invalid credentials" })

    const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, { expiresIn: "1h" })
    res.send({ token })
  } catch (error) {
    res.status(500).send({ message: "Server error", error })
  }
})

// fetch users: /users
app.get("/users", authenticate, async (req, res) => {
  try {
    const users = await User.find()
    res.send(users)
  } catch (error) {
    res.status(500).send({ message: "Error retrieving users", error })
  }
})

// fetch a user by email

app.get("/users/:email",authenticate, async (req,res)=>{
  const email = req.params.email
  const user = await User.find({email})
  if(!user){
    res.status(404).send("user not found")
  }
  res.json(user)
})

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`))
