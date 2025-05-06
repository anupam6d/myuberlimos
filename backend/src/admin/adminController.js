const jwt = require('jsonwebtoken');
const supabase = require('../config/supabase');
const adminViews = require('./adminViews');
require('dotenv').config();

const ADMIN_USERNAME = 'admin';
const ADMIN_PASSWORD = 'myuberlimos123';

const JWT_SECRET = process.env.JWT_SECRET || 'myuberlimos-secret-key';

exports.login = (req, res) => {
  const { username, password } = req.body;
  
  if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
    const token = jwt.sign(
      { username, role: 'admin' },
      JWT_SECRET,
      { expiresIn: '24h' }
    );
    
    res.cookie('token', token, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000 // 24 hours
    });
    
    return res.status(200).json({
      success: true,
      message: 'Login successful',
      token
    });
  }
  
  return res.status(401).json({
    success: false,
    message: 'Invalid username or password'
  });
};

exports.verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1] || req.cookies.token;
  
  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Access denied. No token provided.'
    });
  }
  
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: 'Invalid token'
    });
  }
};

exports.getDashboard = async (req, res) => {
  try {
    const { count: totalBookings, error: countError } = await supabase
      .from('bookings')
      .select('*', { count: 'exact', head: true });
    
    if (countError) {
      throw countError;
    }
    
    const { data: recentBookings, error: bookingsError } = await supabase
      .from('bookings')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(5);
    
    if (bookingsError) {
      throw bookingsError;
    }
    
    const dashboardHtml = adminViews.renderDashboard({
      totalBookings,
      recentBookings
    });
    
    res.send(dashboardHtml);
  } catch (error) {
    console.error('Error fetching dashboard data:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

exports.getAllBookings = async (req, res) => {
  try {
    const { data: bookings, error } = await supabase
      .from('bookings')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) {
      throw error;
    }
    
    const format = req.query.format || 'json';
    
    if (format === 'html') {
      const bookingsHtml = adminViews.renderBookingsList(bookings);
      return res.send(bookingsHtml);
    }
    
    return res.status(200).json({
      success: true,
      count: bookings.length,
      data: bookings
    });
  } catch (error) {
    console.error('Error fetching bookings:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

exports.getBookingDetails = async (req, res) => {
  try {
    const { data: booking, error } = await supabase
      .from('bookings')
      .select('*')
      .eq('id', req.params.id)
      .single();
    
    if (error) {
      throw error;
    }
    
    if (!booking) {
      return res.status(404).json({
        success: false,
        error: 'Booking not found'
      });
    }
    
    const format = req.query.format || 'json';
    
    if (format === 'html') {
      const bookingHtml = adminViews.renderBookingDetails(booking);
      return res.send(bookingHtml);
    }
    
    return res.status(200).json({
      success: true,
      data: booking
    });
  } catch (error) {
    console.error('Error fetching booking details:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

exports.deleteBooking = async (req, res) => {
  try {
    const { data: booking, error: fetchError } = await supabase
      .from('bookings')
      .select('*')
      .eq('id', req.params.id)
      .single();
    
    if (fetchError) {
      throw fetchError;
    }
    
    if (!booking) {
      return res.status(404).json({
        success: false,
        error: 'Booking not found'
      });
    }
    
    const { error: deleteError } = await supabase
      .from('bookings')
      .delete()
      .eq('id', req.params.id);
    
    if (deleteError) {
      throw deleteError;
    }
    
    return res.status(200).json({
      success: true,
      message: 'Booking deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting booking:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};
