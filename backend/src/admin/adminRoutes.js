const express = require('express');
const router = express.Router();
const adminController = require('./adminController');

router.post('/login', adminController.login);

router.get('/dashboard', adminController.verifyToken, adminController.getDashboard);

router.get('/bookings', adminController.verifyToken, adminController.getAllBookings);

router.get('/bookings/:id', adminController.verifyToken, adminController.getBookingDetails);

router.delete('/bookings/:id', adminController.verifyToken, adminController.deleteBooking);

module.exports = router;
