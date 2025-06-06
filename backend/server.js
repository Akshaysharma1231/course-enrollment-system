const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const enrollmentRoutes = require('./routes/enrollmentRoutes');

const app = express();


app.use(cors());
app.use(express.json());


mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log('MongoDB connection error:', err));


app.use('/api/enrollments', enrollmentRoutes);


app.get('/', (req, res) => {
  res.json({ message: 'Course Enrollment API is running' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});