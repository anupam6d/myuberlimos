const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const cookieParser = require('cookie-parser');
const sequelize = require('./config/database');
const bookingRoutes = require('./routes/bookingRoutes');
const adminRoutes = require('./admin/adminRoutes');

dotenv.config();

const app = express();

app.use(cors({
  origin: true,
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());

app.use(express.static(path.join(__dirname, '../public')));

app.use('/api/bookings', bookingRoutes);
app.use('/admin', adminRoutes);

app.get('/admin', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/admin/login.html'));
});

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connection has been established successfully.');
    
    await sequelize.sync();
    console.log('Database synchronized successfully');
    
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
      console.log(`Admin panel available at http://localhost:${PORT}/admin`);
    });
  } catch (error) {
    console.error('Unable to connect to the database:', error);
    process.exit(1);
  }
};

startServer();

process.on('unhandledRejection', (err) => {
  console.log(`Error: ${err.message}`);
  process.exit(1);
});
