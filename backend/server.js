const express = require('express'); // Express framework
const dotenv = require('dotenv'); // Environment variables
const mongoose = require('mongoose'); // MongoDB ODM
const userRoutes = require('./routes/userRoutes'); // User routes
const cors = require('cors'); // CORS middleware
// Load environment variables from .env file
dotenv.config();
// Initialize express application
const app = express();
// Middleware to parse JSON
app.use(express.json());
// Enable CORS for all origins
app.use(cors());
// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));
// Use user routes
app.use('/api/users', userRoutes);
// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));