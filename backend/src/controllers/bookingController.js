const supabase = require('../config/supabase');
const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

exports.createBooking = async (req, res) => {
  try {
    const { data: booking, error } = await supabase
      .from('bookings')
      .insert([{
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        date: req.body.date,
        time: req.body.time,
        passengers: req.body.passengers,
        vehicle: req.body.vehicle,
        pickup: req.body.pickup,
        dropoff: req.body.dropoff,
        message: req.body.message || '',
        is_quote: req.body.isQuote || false,
        created_at: new Date().toISOString()
      }])
      .select()
      .single();
    
    if (error) {
      throw error;
    }
    
    const emailData = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_TO || 'das.anupam01@gmail.com',
      subject: req.body.isQuote ? 'Quote Request from MyUberLimos Website' : 'Booking Request from MyUberLimos Website',
      text: `
        Name: ${req.body.name}
        Email: ${req.body.email}
        Phone: ${req.body.phone}
        Date: ${req.body.date}
        Time: ${req.body.time}
        Passengers: ${req.body.passengers}
        Vehicle: ${req.body.vehicle}
        Pickup: ${req.body.pickup}
        Dropoff: ${req.body.dropoff}
        Additional Information: ${req.body.message || 'None'}
      `,
      html: `
        <h2>${req.body.isQuote ? 'Quote Request' : 'Booking Request'} from MyUberLimos Website</h2>
        <p><strong>Name:</strong> ${req.body.name}</p>
        <p><strong>Email:</strong> ${req.body.email}</p>
        <p><strong>Phone:</strong> ${req.body.phone}</p>
        <p><strong>Date:</strong> ${req.body.date}</p>
        <p><strong>Time:</strong> ${req.body.time}</p>
        <p><strong>Passengers:</strong> ${req.body.passengers}</p>
        <p><strong>Vehicle:</strong> ${req.body.vehicle}</p>
        <p><strong>Pickup:</strong> ${req.body.pickup}</p>
        <p><strong>Dropoff:</strong> ${req.body.dropoff}</p>
        <p><strong>Additional Information:</strong> ${req.body.message || 'None'}</p>
      `
    };
    
    if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
      try {
        await transporter.sendMail(emailData);
        console.log('Email sent successfully');
      } catch (emailError) {
        console.error('Error sending email:', emailError);
      }
    } else {
      console.log('Email credentials not configured. Skipping email notification.');
    }
    
    res.status(201).json({
      success: true,
      data: booking
    });
  } catch (error) {
    console.error('Error creating booking:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

exports.getBookings = async (req, res) => {
  try {
    const { data: bookings, error } = await supabase
      .from('bookings')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) {
      throw error;
    }
    
    res.status(200).json({
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

exports.getBooking = async (req, res) => {
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
    
    res.status(200).json({
      success: true,
      data: booking
    });
  } catch (error) {
    console.error('Error fetching booking:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};
