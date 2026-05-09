const express = require('express')
const dotenv = require('dotenv')
const cors = require('cors')
const mongoose = require('mongoose')
const helmet = require('helmet')
const morgan = require('morgan')
const path = require('path')

const { errorHandler } = require('./middleware/errorMiddleware')
const upload = require('./middleware/uploadMiddleware')

// Routes
const authRoutes = require('./routes/authRoutes')
const blogRoutes = require('./routes/blogRoutes')
const projectRoutes = require('./routes/projectRoutes')
const contactRoutes = require('./routes/contactRoutes')
const dashboardRoutes = require('./routes/dashboardRoutes')
const serviceRoutes = require('./routes/serviceRoutes')

// Load ENV
dotenv.config()

const app = express()

/* ======================================================
   SECURITY + MIDDLEWARE
====================================================== */

app.use(
  helmet({
    crossOriginResourcePolicy: false
  })
)

const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:5174',
  'https://codecelix-wine.vercel.app',
  'https://codecelix-fm62j23e8-university472s-projects.vercel.app'
]

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true)
      } else {
        callback(new Error('CORS Not Allowed'))
      }
    },
    credentials: true
  })
)

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(morgan('dev'))

/* ======================================================
   STATIC FOLDER
====================================================== */

app.use('/uploads', express.static(path.join(__dirname, 'uploads')))

/* ======================================================
   HEALTH CHECK ROUTE
====================================================== */

app.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Codecelix Backend API Running Successfully'
  })
})

/* ======================================================
   IMAGE UPLOAD ROUTE
====================================================== */

app.post('/api/upload', upload.single('image'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'Please upload a file'
      })
    }

    const imageUrl = `${req.protocol}://${req.get('host')}/uploads/${
      req.file.filename
    }`

    res.status(200).json({
      success: true,
      message: 'Image uploaded successfully',
      url: imageUrl
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    })
  }
})

/* ======================================================
   API ROUTES
====================================================== */

app.use('/api/auth', authRoutes)

app.use('/api/blogs', blogRoutes)
app.use('/api/projects', projectRoutes)
app.use('/api/contact', contactRoutes)
app.use('/api/dashboard', dashboardRoutes)
app.use('/api/services', serviceRoutes)

/* ======================================================
   404 ROUTE HANDLER
====================================================== */

app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: `Route Not Found: ${req.originalUrl}`
  })
})

/* ======================================================
   GLOBAL ERROR HANDLER
====================================================== */

app.use(errorHandler)

/* ======================================================
   DATABASE CONNECTION + SERVER START
====================================================== */

const PORT = process.env.PORT || 5000

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ MongoDB Connected Successfully')

    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`)
    })
  })
  .catch((err) => {
    console.log('❌ MongoDB Connection Error:', err.message)
    process.exit(1)
  })
