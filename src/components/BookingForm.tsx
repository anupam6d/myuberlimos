import React, { useState, useRef } from 'react'
import { Button } from './ui/button'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { Textarea } from './ui/textarea'
import { X } from 'lucide-react'
import emailjs from '@emailjs/browser'

// Initialize EmailJS with a public key
// Note: In production, this would be replaced with a real EmailJS public key
emailjs.init("public_key_placeholder")

interface BookingFormProps {
  isQuote?: boolean
  onClose: () => void
}

export function BookingForm({ isQuote = false, onClose }: BookingFormProps) {
  const formRef = useRef<HTMLFormElement>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    pickup: '',
    dropoff: '',
    passengers: '1',
    vehicle: '',
    message: ''
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    const bookingData = {
      ...formData,
      isQuote
    }
    
    const emailData = {
      to_email: 'das.anupam01@gmail.com',
      from_name: formData.name,
      from_email: formData.email,
      subject: isQuote ? 'Quote Request from MyUberLimos Website' : 'Booking Request from MyUberLimos Website',
      message: `
        Name: ${formData.name}
        Email: ${formData.email}
        Phone: ${formData.phone}
        Date: ${formData.date}
        Time: ${formData.time}
        Passengers: ${formData.passengers}
        Vehicle: ${formData.vehicle}
        Pickup: ${formData.pickup}
        Dropoff: ${formData.dropoff}
        Additional Information: ${formData.message}
      `
    }
    
    fetch(window.location.hostname === 'localhost' ? 'http://localhost:5000/api/bookings' : 'https://chauffeur-service-website-tunnel-fe8v84ox.devinapps.com/api/bookings', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(bookingData),
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      console.log('Booking saved to database:', data);
      
      console.log('Email would be sent with the following data:', emailData);
      return Promise.resolve({ status: 200, text: 'OK' });
    })
    .then(() => {
      alert('Thank you for your booking request. We will contact you shortly to confirm your reservation.');
      setIsSubmitting(false);
      onClose();
    })
    .catch((error) => {
      console.error('Error processing booking:', error);
      alert('There was an error sending your request. Please try again or contact us directly.');
      setIsSubmitting(false);
    })
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <CardHeader className="relative">
          <Button 
            variant="ghost" 
            className="absolute right-2 top-2 h-8 w-8 p-0" 
            onClick={onClose}
          >
            <X className="h-4 w-4" />
          </Button>
          <CardTitle className="text-2xl font-bold text-center">
            {isQuote ? 'Request a Quote' : 'Book Your Luxury Transportation'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name *</Label>
                <Input 
                  id="name" 
                  name="name" 
                  value={formData.name} 
                  onChange={handleChange} 
                  required 
                  placeholder="John Smith"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email Address *</Label>
                <Input 
                  id="email" 
                  name="email" 
                  type="email" 
                  value={formData.email} 
                  onChange={handleChange} 
                  required 
                  placeholder="john@example.com"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number *</Label>
                <Input 
                  id="phone" 
                  name="phone" 
                  value={formData.phone} 
                  onChange={handleChange} 
                  required 
                  placeholder="+61 450 650 490"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="date">Date of Service *</Label>
                <Input 
                  id="date" 
                  name="date" 
                  type="date" 
                  value={formData.date} 
                  onChange={handleChange} 
                  required 
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="time">Time of Service *</Label>
                <Input 
                  id="time" 
                  name="time" 
                  type="time" 
                  value={formData.time} 
                  onChange={handleChange} 
                  required 
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="passengers">Number of Passengers *</Label>
                <Select 
                  value={formData.passengers} 
                  onValueChange={(value) => handleSelectChange('passengers', value)}
                >
                  <SelectTrigger id="passengers">
                    <SelectValue placeholder="Select number of passengers" />
                  </SelectTrigger>
                  <SelectContent>
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
                      <SelectItem key={num} value={num.toString()}>
                        {num} {num === 1 ? 'passenger' : 'passengers'}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="vehicle">Preferred Vehicle *</Label>
                <Select 
                  value={formData.vehicle} 
                  onValueChange={(value) => handleSelectChange('vehicle', value)}
                >
                  <SelectTrigger id="vehicle">
                    <SelectValue placeholder="Select vehicle type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="luxury-sedan">Luxury Sedan</SelectItem>
                    <SelectItem value="suv">Premium SUV</SelectItem>
                    <SelectItem value="stretch-limo">Stretch Limousine</SelectItem>
                    <SelectItem value="van">Premium Van</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="pickup">Pickup Location *</Label>
              <Input 
                id="pickup" 
                name="pickup" 
                value={formData.pickup} 
                onChange={handleChange} 
                required 
                placeholder="Address, Airport Terminal, etc."
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="dropoff">Drop-off Location *</Label>
              <Input 
                id="dropoff" 
                name="dropoff" 
                value={formData.dropoff} 
                onChange={handleChange} 
                required 
                placeholder="Address, Airport Terminal, etc."
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="message">Additional Information</Label>
              <Textarea 
                id="message" 
                name="message" 
                value={formData.message} 
                onChange={handleChange} 
                placeholder="Special requests, flight details, etc."
                rows={4}
              />
            </div>
            
            <div className="pt-4">
              <Button 
                type="submit" 
                className="w-full bg-amber-500 hover:bg-amber-600 text-white"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Submitting...' : isQuote ? 'Request Quote' : 'Book Now'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
