const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const cookieParser = require('cookie-parser');
const supabase = require('./config/supabase');
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
    console.log('Testing Supabase connection...');
    const { data, error } = await supabase.auth.getSession();
    
    if (error) {
      console.error('Error connecting to Supabase:', error);
      console.log('Please check your Supabase credentials and make sure the service is available.');
    } else {
      console.log('Supabase connection has been established successfully.');
      console.log('Note: Make sure to create the "bookings" table in your Supabase dashboard with the following columns:');
      console.log('- id (type: int8, primary key, identity)');
      console.log('- name (type: text)');
      console.log('- email (type: text)');
      console.log('- phone (type: text)');
      console.log('- date (type: text)');
      console.log('- time (type: text)');
      console.log('- passengers (type: text)');
      console.log('- vehicle (type: text)');
      console.log('- pickup (type: text)');
      console.log('- dropoff (type: text)');
      console.log('- message (type: text, nullable)');
      console.log('- is_quote (type: boolean, default: false)');
      console.log('- created_at (type: timestamptz, default: now())');
    }
    
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
      console.log(`Admin panel available at http://localhost:${PORT}/admin`);
    });
  } catch (error) {
    console.error('Unable to start server:', error);
    process.exit(1);
  }
};

startServer();

process.on('unhandledRejection', (err) => {
  console.log(`Error: ${err.message}`);
  process.exit(1);
});
