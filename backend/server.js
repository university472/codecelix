const express = require('express')
const dotenv = require('dotenv')
const cors = require('cors')
const mongoose = require('mongoose')
const helmet = require('helmet')
const morgan = require('morgan')
const path = require('path')
const { errorHandler } = require('./middleware/errorMiddleware')
const upload = require('./middleware/uploadMiddleware')

dotenv.config()
const app = express()

app.use(helmet({ crossOriginResourcePolicy: false }))
// app.use(cors({ origin: 'http://localhost:5173', credentials: true }))
app.use(
  cors({
    origin: ['http://localhost:5173', 'http://localhost:5174'],
    credentials: true
  })
)
app.use(express.json())
app.use(morgan('dev'))
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))

// Routes
app.post('/api/upload', upload.single('image'), (req, res) => {
  if (!req.file)
    return res.status(400).json({ message: 'Please upload a file' })
  const imageUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`
  res
    .status(200)
    .json({ message: 'Image uploaded successfully', url: imageUrl })
})

app.use('/api/auth', require('./routes/authRoutes'))
app.use('/api/blogs', require('./routes/blogRoutes'))
app.use('/blogs', require('./routes/blogRoutes'))
app.use('/api/projects', require('./routes/projectRoutes'))
app.use('/api/contact', require('./routes/contactRoutes'))
app.use('/contact', require('./routes/contactRoutes'))
app.use('/api/dashboard', require('./routes/dashboardRoutes'))
app.use('/api/services', require('./routes/serviceRoutes'))
app.use('/services', require('./routes/serviceRoutes'))
app.use(errorHandler)

const PORT = process.env.PORT || 5000

// ✅ Start server ONLY after MongoDB connects
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB Connected Successfully')
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
  })
  .catch((err) => {
    console.log('MongoDB Connection Error:', err)
    process.exit(1)
  })

// const express = require('express')
// const dotenv = require('dotenv')
// const cors = require('cors')
// const mongoose = require('mongoose')
// const helmet = require('helmet')
// const morgan = require('morgan')
// const path = require('path')
// const { errorHandler } = require('./middleware/errorMiddleware')
// const upload = require('./middleware/uploadMiddleware')

// // Load env variables
// dotenv.config()

// const app = express()

// // --- 1. Global Middlewares (IMPORTANT) ---

// app.use(helmet({ crossOriginResourcePolicy: false }))

// // ✅ CORS configuration (Frontend React app)
// app.use(
//   cors({
//     origin: 'http://localhost:5173',
//     credentials: true
//   })
// )

// app.use(express.json())
// app.use(morgan('dev'))

// // --- 2. Static Folder ---
// // Yeh images ko browser mein dikhane ke liye hai
// app.use('/uploads', express.static(path.join(__dirname, 'uploads')))

// // --- 3. Database Connection ---
// mongoose
//   .connect(process.env.MONGO_URI)
//   .then(() => console.log('MongoDB Connected Successfully'))
//   .catch((err) => console.log('MongoDB Connection Error:', err))

// // --- 4. Image Upload Route ---
// app.post('/api/upload', upload.single('image'), (req, res) => {
//   if (!req.file) {
//     return res.status(400).json({ message: 'Please upload a file' })
//   }

//   const imageUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`

//   res.status(200).json({
//     message: 'Image uploaded successfully',
//     url: imageUrl
//   })
// })

// // --- 5. API Routes Registration ---

// // ✅ Auth routes (for login, register, send-otp etc.)
// const authRoutes = require('./routes/authRoutes') // ← expects authRoutes.js

// app.use('/api/auth', authRoutes)

// app.use('/api/blogs', require('./routes/blogRoutes'))
// app.use('/api/projects', require('./routes/projectRoutes'))
// app.use('/api/contact', require('./routes/contactRoutes'))
// app.use('/api/dashboard', require('./routes/dashboardRoutes'))
// app.use('/api/services', require('./routes/serviceRoutes'))

// // --- 6. Global Error Handler ---
// app.use(errorHandler)

// // --- 7. Start Server ---
// const PORT = process.env.PORT || 5000

// // app.listen(PORT, () => {
// //   console.log(`Server running on port ${PORT}`)
// // })

// mongoose
//   .connect(process.env.MONGO_URI)
//   .then(() => {
//     console.log('MongoDB Connected Successfully')
//     app.listen(PORT, () => {
//       console.log(`Server running on port ${PORT}`)
//     })
//   })
//   .catch((err) => {
//     console.log('MongoDB Connection Error:', err)
//     process.exit(1)
//   })
