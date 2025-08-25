const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Middleware
app.use(cors({
  origin: [
    'https://aussiemobiletyre.vercel.app',  
    'http://localhost:5173',
    'https://aussiemobiletyre.netlify.app'
  ],
  credentials: true
}));
app.use(express.json());

// Import Routes
const drdRoutes = require('./routes/drdRoutes');
const authRoutes = require('./routes/authRoutes');
const serviceAreaRoutes = require('./routes/serviceAreaRoutes');
const adminRoutes = require('./routes/admin');
const contactRoute = require('./routes/contact');
const blogRoutes = require('./routes/blogRoutes');
const stripeRoutes = require('./routes/stripe');
const tyreallRoutes = require('./routes/tyreallRoutes');
const couponRoutes = require('./routes/couponRoutes');
const bookingRoutes = require('./routes/booking');
const bookingSlotRoutes = require('./routes/bookingSlotRoutes');

// Root Route
app.get('/', (req, res) => {
  res.send('API is running');
});

// API Routes
app.use('/api/drd', drdRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/service', serviceAreaRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/contact', contactRoute);
app.use('/api/blogs', blogRoutes);
app.use('/api/stripe', stripeRoutes);
app.use('/api/tyreall', tyreallRoutes);
app.use('/api/coupons', couponRoutes);
app.use('/api/booking', bookingRoutes);
app.use('/api/slots', bookingSlotRoutes);

// 🧠 Local development only
if (require.main === module) {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
  });
}

// ✅ Export for Vercel serverless function
module.exports = app;
