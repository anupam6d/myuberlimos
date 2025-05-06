import './App.css'
import { useState } from 'react'
import { Button } from './components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from './components/ui/card'
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from './components/ui/navigation-menu'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './components/ui/tabs'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './components/ui/carousel'
import { PhoneCall, Mail, MapPin, Car, Calendar, Clock, Award, Users, Star } from 'lucide-react'
import { BookingForm } from './components/BookingForm'

function App() {
  const [showBookingForm, setShowBookingForm] = useState(false)
  const [isQuote, setIsQuote] = useState(false)

  const handleOpenBooking = (quote = false) => {
    setIsQuote(quote)
    setShowBookingForm(true)
  }

  const handleCloseBooking = () => {
    setShowBookingForm(false)
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header with contact info */}
      <div className="bg-gray-900 text-white py-2">
        <div className="container mx-auto flex justify-between items-center px-4">
          <div className="flex items-center space-x-4">
            <a href="mailto:info@myuberlimos.com" className="flex items-center text-sm">
              <Mail className="h-4 w-4 mr-1" />
              info@myuberlimos.com
            </a>
            <a href="tel:+61450650490" className="flex items-center text-sm">
              <PhoneCall className="h-4 w-4 mr-1" />
              +61 450 650 490
            </a>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <header className="bg-white shadow-md sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <a href="/" className="text-2xl font-bold text-gray-900">
                MyUberLimos
              </a>
            </div>

            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuLink href="#home" className="px-3 py-2 text-gray-700 hover:text-gray-900">
                    Home
                  </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuTrigger>Our Services</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="grid w-[400px] gap-3 p-4">
                      <NavigationMenuLink href="#services" className="block p-2 hover:bg-gray-100 rounded">
                        Airport Transfers
                      </NavigationMenuLink>
                      <NavigationMenuLink href="#services" className="block p-2 hover:bg-gray-100 rounded">
                        Corporate Travel
                      </NavigationMenuLink>
                      <NavigationMenuLink href="#services" className="block p-2 hover:bg-gray-100 rounded">
                        Wedding Transportation
                      </NavigationMenuLink>
                      <NavigationMenuLink href="#services" className="block p-2 hover:bg-gray-100 rounded">
                        Special Events
                      </NavigationMenuLink>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuTrigger>Our Fleet</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="grid w-[400px] gap-3 p-4">
                      <NavigationMenuLink href="#fleet" className="block p-2 hover:bg-gray-100 rounded">
                        Luxury Sedans
                      </NavigationMenuLink>
                      <NavigationMenuLink href="#fleet" className="block p-2 hover:bg-gray-100 rounded">
                        SUVs
                      </NavigationMenuLink>
                      <NavigationMenuLink href="#fleet" className="block p-2 hover:bg-gray-100 rounded">
                        Stretch Limousines
                      </NavigationMenuLink>
                      <NavigationMenuLink href="#fleet" className="block p-2 hover:bg-gray-100 rounded">
                        Premium Vans
                      </NavigationMenuLink>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink href="#about" className="px-3 py-2 text-gray-700 hover:text-gray-900">
                    About Us
                  </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink href="#contact" className="px-3 py-2 text-gray-700 hover:text-gray-900">
                    Contact
                  </NavigationMenuLink>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>

            <Button 
              className="bg-amber-500 hover:bg-amber-600 text-white"
              onClick={() => handleOpenBooking(false)}
            >
              Book Online
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section id="home" className="relative">
        <div className="h-[600px] bg-cover bg-center" style={{ backgroundImage: "url('/images/hero.jpg')" }}>
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center">
            <div className="container mx-auto px-4">
              <div className="max-w-xl text-white">
                <h1 className="text-4xl md:text-5xl font-bold mb-4">Premium Chauffeur Services</h1>
                <p className="text-xl mb-8">Experience luxury transportation with our professional chauffeurs and premium vehicles</p>
                <div className="flex space-x-4">
                  <Button 
                    className="bg-amber-500 hover:bg-amber-600 text-white"
                    onClick={() => handleOpenBooking(false)}
                  >
                    Book Online
                  </Button>
                  <Button 
                    variant="outline" 
                    className="bg-transparent border-white text-white hover:bg-white hover:text-gray-900"
                    onClick={() => handleOpenBooking(true)}
                  >
                    Get a Quote
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section id="about" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Welcome to MyUberLimos</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We provide premium chauffeur services with a focus on luxury, comfort, and reliability. 
              Our professional drivers and high-end vehicles ensure an exceptional experience for all your transportation needs.
            </p>
          </div>

          <Tabs defaultValue="services" className="w-full max-w-4xl mx-auto">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="services">Our Services</TabsTrigger>
              <TabsTrigger value="fleet">Our Fleet</TabsTrigger>
              <TabsTrigger value="why-us">Why Choose Us</TabsTrigger>
            </TabsList>
            <TabsContent id="services" value="services" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Car className="h-5 w-5 mr-2 text-amber-500" />
                      Airport Transfers
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>Reliable and punctual airport pickup and drop-off services. We monitor flight times to ensure we're always there when you need us.</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Users className="h-5 w-5 mr-2 text-amber-500" />
                      Corporate Travel
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>Impress clients and colleagues with our professional corporate transportation services. Perfect for business meetings and events.</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Calendar className="h-5 w-5 mr-2 text-amber-500" />
                      Wedding Transportation
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>Make your special day even more memorable with our luxury wedding transportation services. Elegance and style guaranteed.</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Clock className="h-5 w-5 mr-2 text-amber-500" />
                      Special Events
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>From proms to anniversaries, our chauffeurs will ensure you arrive in style to any special event or celebration.</p>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            <TabsContent id="fleet" value="fleet" className="mt-6">
              <Carousel className="w-full">
                <CarouselContent>
                  <CarouselItem className="md:basis-1/2 lg:basis-1/3">
                    <Card>
                      <CardContent className="p-0">
                        <img src="/images/car1.jpg" alt="Luxury Sedan" className="w-full h-48 object-cover" />
                      </CardContent>
                      <CardFooter className="flex flex-col items-start">
                        <h3 className="font-bold text-lg mb-1">Luxury Sedans</h3>
                        <p className="text-sm text-gray-600">Elegant and comfortable sedans perfect for business travel and airport transfers.</p>
                      </CardFooter>
                    </Card>
                  </CarouselItem>
                  <CarouselItem className="md:basis-1/2 lg:basis-1/3">
                    <Card>
                      <CardContent className="p-0">
                        <img src="/images/car2.jpg" alt="SUV" className="w-full h-48 object-cover" />
                      </CardContent>
                      <CardFooter className="flex flex-col items-start">
                        <h3 className="font-bold text-lg mb-1">Premium SUVs</h3>
                        <p className="text-sm text-gray-600">Spacious and luxurious SUVs ideal for group travel and extra luggage.</p>
                      </CardFooter>
                    </Card>
                  </CarouselItem>
                  <CarouselItem className="md:basis-1/2 lg:basis-1/3">
                    <Card>
                      <CardContent className="p-0">
                        <img src="/images/car3.jpg" alt="Stretch Limousine" className="w-full h-48 object-cover" />
                      </CardContent>
                      <CardFooter className="flex flex-col items-start">
                        <h3 className="font-bold text-lg mb-1">Stretch Limousines</h3>
                        <p className="text-sm text-gray-600">Make a statement with our stretch limousines, perfect for weddings and special events.</p>
                      </CardFooter>
                    </Card>
                  </CarouselItem>
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
              </Carousel>
            </TabsContent>
            <TabsContent value="why-us" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Award className="h-5 w-5 mr-2 text-amber-500" />
                      Professional Chauffeurs
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>Our chauffeurs are professionally trained, licensed, and experienced to provide the highest level of service.</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Star className="h-5 w-5 mr-2 text-amber-500" />
                      Luxury Vehicles
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>Our fleet consists of premium, well-maintained vehicles that ensure comfort, style, and reliability.</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Clock className="h-5 w-5 mr-2 text-amber-500" />
                      Punctuality Guaranteed
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>We pride ourselves on being punctual. Our chauffeurs arrive early to ensure you're never kept waiting.</p>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">What Our Clients Say</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Don't just take our word for it. Here's what our satisfied clients have to say about our services.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="bg-gray-50">
              <CardContent className="pt-6">
                <div className="flex items-center mb-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="h-5 w-5 fill-current text-amber-500" />
                  ))}
                </div>
                <p className="italic mb-4">"The service was impeccable. Our chauffeur was professional, punctual, and the vehicle was immaculate. Highly recommended!"</p>
                <p className="font-semibold">- Sarah Johnson</p>
              </CardContent>
            </Card>
            <Card className="bg-gray-50">
              <CardContent className="pt-6">
                <div className="flex items-center mb-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="h-5 w-5 fill-current text-amber-500" />
                  ))}
                </div>
                <p className="italic mb-4">"Used MyUberLimos for our corporate event and they exceeded expectations. The booking process was easy and the service was top-notch."</p>
                <p className="font-semibold">- Michael Thompson</p>
              </CardContent>
            </Card>
            <Card className="bg-gray-50">
              <CardContent className="pt-6">
                <div className="flex items-center mb-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="h-5 w-5 fill-current text-amber-500" />
                  ))}
                </div>
                <p className="italic mb-4">&quot;Our wedding day transportation was perfect thanks to MyUberLimos. The stretch limousine was beautiful and our chauffeur was amazing.&quot;</p>
                <p className="font-semibold">- Emily &amp; David</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section id="contact" className="py-16 bg-gray-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Experience Luxury Transportation?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Book your premium chauffeur service today and travel in style, comfort, and safety.
          </p>
          <div className="flex justify-center space-x-4">
            <Button 
              className="bg-amber-500 hover:bg-amber-600 text-white"
              onClick={() => handleOpenBooking(false)}
            >
              Book Online
            </Button>
            <Button 
              variant="outline" 
              className="bg-transparent border-white text-white hover:bg-white hover:text-gray-900"
              onClick={() => handleOpenBooking(false)}
            >
              Contact Us
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">MyUberLimos</h3>
              <p className="mb-4">Premium chauffeur services for all your transportation needs.</p>
              <div className="flex space-x-4">
                <a href="#" className="text-white hover:text-amber-500">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                  </svg>
                </a>
                <a href="#" className="text-white hover:text-amber-500">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                  </svg>
                </a>
                <a href="#" className="text-white hover:text-amber-500">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-amber-500">Home</a></li>
                <li><a href="#" className="hover:text-amber-500">Our Services</a></li>
                <li><a href="#" className="hover:text-amber-500">Our Fleet</a></li>
                <li><a href="#" className="hover:text-amber-500">About Us</a></li>
                <li><a href="#" className="hover:text-amber-500">Contact</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Services</h3>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-amber-500">Airport Transfers</a></li>
                <li><a href="#" className="hover:text-amber-500">Corporate Travel</a></li>
                <li><a href="#" className="hover:text-amber-500">Wedding Transportation</a></li>
                <li><a href="#" className="hover:text-amber-500">Special Events</a></li>
                <li><a href="#" className="hover:text-amber-500">Hourly Hire</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <MapPin className="h-5 w-5 mr-2 text-amber-500" />
                  7 Paior Cct Epping VIC 3076
                </li>
                <li className="flex items-center">
                  <PhoneCall className="h-5 w-5 mr-2 text-amber-500" />
                  +61 450 650 490
                </li>
                <li className="flex items-center">
                  <Mail className="h-5 w-5 mr-2 text-amber-500" />
                  info@myuberlimos.com
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center">
            <p>&copy; {new Date().getFullYear()} MyUberLimos. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Booking Form Modal */}
      {showBookingForm && (
        <BookingForm 
          isQuote={isQuote} 
          onClose={handleCloseBooking} 
        />
      )}
    </div>
  )
}

export default App
