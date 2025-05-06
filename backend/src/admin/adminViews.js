
exports.renderDashboard = (data) => {
  const { totalBookings, recentBookings } = data;
  
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };
  
  const recentBookingsHtml = recentBookings.map(booking => `
    <tr>
      <td class="border px-4 py-2">${booking.name}</td>
      <td class="border px-4 py-2">${booking.email}</td>
      <td class="border px-4 py-2">${booking.phone}</td>
      <td class="border px-4 py-2">${booking.date}</td>
      <td class="border px-4 py-2">${formatDate(booking.createdAt)}</td>
      <td class="border px-4 py-2">
        <a href="/admin/bookings/${booking.id}?format=html" class="text-blue-500 hover:underline">View</a>
      </td>
    </tr>
  `).join('');
  
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>MyUberLimos Admin Dashboard</title>
      <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
    </head>
    <body class="bg-gray-100">
      <div class="min-h-screen">
        <nav class="bg-gray-800 text-white p-4">
          <div class="container mx-auto flex justify-between items-center">
            <h1 class="text-xl font-bold">MyUberLimos Admin</h1>
            <div>
              <a href="/admin/bookings?format=html" class="mr-4 hover:underline">Bookings</a>
              <button id="logoutBtn" class="hover:underline">Logout</button>
            </div>
          </div>
        </nav>
        
        <div class="container mx-auto p-4">
          <h2 class="text-2xl font-bold mb-6">Dashboard</h2>
          
          <div class="bg-white rounded-lg shadow p-6 mb-6">
            <h3 class="text-xl font-semibold mb-4">Overview</h3>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div class="bg-blue-100 p-4 rounded-lg">
                <h4 class="text-lg font-medium text-blue-800">Total Bookings</h4>
                <p class="text-3xl font-bold text-blue-600">${totalBookings}</p>
              </div>
            </div>
          </div>
          
          <div class="bg-white rounded-lg shadow p-6">
            <h3 class="text-xl font-semibold mb-4">Recent Bookings</h3>
            <div class="overflow-x-auto">
              <table class="min-w-full bg-white">
                <thead>
                  <tr>
                    <th class="border px-4 py-2">Name</th>
                    <th class="border px-4 py-2">Email</th>
                    <th class="border px-4 py-2">Phone</th>
                    <th class="border px-4 py-2">Date</th>
                    <th class="border px-4 py-2">Created At</th>
                    <th class="border px-4 py-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  ${recentBookingsHtml || '<tr><td colspan="6" class="border px-4 py-2 text-center">No bookings found</td></tr>'}
                </tbody>
              </table>
            </div>
            <div class="mt-4">
              <a href="/admin/bookings?format=html" class="text-blue-500 hover:underline">View All Bookings</a>
            </div>
          </div>
        </div>
      </div>
      
      <script>
        document.getElementById('logoutBtn').addEventListener('click', function() {
          document.cookie = 'token=; Max-Age=0; path=/;';
          window.location.href = '/admin/login.html';
        });
      </script>
    </body>
    </html>
  `;
};

exports.renderBookingsList = (bookings) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };
  
  const bookingsHtml = bookings.map(booking => `
    <tr>
      <td class="border px-4 py-2">${booking.name}</td>
      <td class="border px-4 py-2">${booking.email}</td>
      <td class="border px-4 py-2">${booking.phone}</td>
      <td class="border px-4 py-2">${booking.date}</td>
      <td class="border px-4 py-2">${booking.time}</td>
      <td class="border px-4 py-2">${booking.isQuote ? 'Quote' : 'Booking'}</td>
      <td class="border px-4 py-2">${formatDate(booking.createdAt)}</td>
      <td class="border px-4 py-2">
        <a href="/admin/bookings/${booking.id}?format=html" class="text-blue-500 hover:underline mr-2">View</a>
        <button class="text-red-500 hover:underline delete-btn" data-id="${booking.id}">Delete</button>
      </td>
    </tr>
  `).join('');
  
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>MyUberLimos Admin - Bookings</title>
      <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
    </head>
    <body class="bg-gray-100">
      <div class="min-h-screen">
        <nav class="bg-gray-800 text-white p-4">
          <div class="container mx-auto flex justify-between items-center">
            <h1 class="text-xl font-bold">MyUberLimos Admin</h1>
            <div>
              <a href="/admin/dashboard" class="mr-4 hover:underline">Dashboard</a>
              <button id="logoutBtn" class="hover:underline">Logout</button>
            </div>
          </div>
        </nav>
        
        <div class="container mx-auto p-4">
          <h2 class="text-2xl font-bold mb-6">All Bookings</h2>
          
          <div class="bg-white rounded-lg shadow p-6">
            <div class="overflow-x-auto">
              <table class="min-w-full bg-white">
                <thead>
                  <tr>
                    <th class="border px-4 py-2">Name</th>
                    <th class="border px-4 py-2">Email</th>
                    <th class="border px-4 py-2">Phone</th>
                    <th class="border px-4 py-2">Date</th>
                    <th class="border px-4 py-2">Time</th>
                    <th class="border px-4 py-2">Type</th>
                    <th class="border px-4 py-2">Created At</th>
                    <th class="border px-4 py-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  ${bookingsHtml || '<tr><td colspan="8" class="border px-4 py-2 text-center">No bookings found</td></tr>'}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      
      <script>
        document.querySelectorAll('.delete-btn').forEach(button => {
          button.addEventListener('click', function() {
            const id = this.getAttribute('data-id');
            if (confirm('Are you sure you want to delete this booking?')) {
              fetch('/admin/bookings/' + id, {
                method: 'DELETE',
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': 'Bearer ' + getCookie('token')
                }
              })
              .then(response => response.json())
              .then(data => {
                if (data.success) {
                  alert('Booking deleted successfully');
                  window.location.reload();
                } else {
                  alert('Error deleting booking: ' + data.error);
                }
              })
              .catch(error => {
                console.error('Error:', error);
                alert('Error deleting booking');
              });
            }
          });
        });
        
        document.getElementById('logoutBtn').addEventListener('click', function() {
          document.cookie = 'token=; Max-Age=0; path=/;';
          window.location.href = '/admin/login.html';
        });
        
        function getCookie(name) {
          const value = '; ' + document.cookie;
          const parts = value.split('; ' + name + '=');
          if (parts.length === 2) return parts.pop().split(';').shift();
        }
      </script>
    </body>
    </html>
  `;
};

exports.renderBookingDetails = (booking) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };
  
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>MyUberLimos Admin - Booking Details</title>
      <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
    </head>
    <body class="bg-gray-100">
      <div class="min-h-screen">
        <nav class="bg-gray-800 text-white p-4">
          <div class="container mx-auto flex justify-between items-center">
            <h1 class="text-xl font-bold">MyUberLimos Admin</h1>
            <div>
              <a href="/admin/dashboard" class="mr-4 hover:underline">Dashboard</a>
              <a href="/admin/bookings?format=html" class="mr-4 hover:underline">Bookings</a>
              <button id="logoutBtn" class="hover:underline">Logout</button>
            </div>
          </div>
        </nav>
        
        <div class="container mx-auto p-4">
          <div class="flex justify-between items-center mb-6">
            <h2 class="text-2xl font-bold">Booking Details</h2>
            <a href="/admin/bookings?format=html" class="text-blue-500 hover:underline">Back to Bookings</a>
          </div>
          
          <div class="bg-white rounded-lg shadow p-6">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 class="text-lg font-semibold mb-4">Customer Information</h3>
                <p><strong>Name:</strong> ${booking.name}</p>
                <p><strong>Email:</strong> ${booking.email}</p>
                <p><strong>Phone:</strong> ${booking.phone}</p>
                <p><strong>Created At:</strong> ${formatDate(booking.createdAt)}</p>
              </div>
              
              <div>
                <h3 class="text-lg font-semibold mb-4">Booking Details</h3>
                <p><strong>Type:</strong> ${booking.isQuote ? 'Quote Request' : 'Booking Request'}</p>
                <p><strong>Date:</strong> ${booking.date}</p>
                <p><strong>Time:</strong> ${booking.time}</p>
                <p><strong>Passengers:</strong> ${booking.passengers}</p>
                <p><strong>Vehicle:</strong> ${booking.vehicle}</p>
              </div>
            </div>
            
            <div class="mt-6">
              <h3 class="text-lg font-semibold mb-4">Trip Information</h3>
              <p><strong>Pickup Location:</strong> ${booking.pickup}</p>
              <p><strong>Drop-off Location:</strong> ${booking.dropoff}</p>
              <p><strong>Additional Information:</strong> ${booking.message || 'None'}</p>
            </div>
            
            <div class="mt-8 flex justify-end">
              <button id="deleteBtn" class="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded" data-id="${booking.id}">Delete Booking</button>
            </div>
          </div>
        </div>
      </div>
      
      <script>
        document.getElementById('deleteBtn').addEventListener('click', function() {
          const id = this.getAttribute('data-id');
          if (confirm('Are you sure you want to delete this booking?')) {
            fetch('/admin/bookings/' + id, {
              method: 'DELETE',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + getCookie('token')
              }
            })
            .then(response => response.json())
            .then(data => {
              if (data.success) {
                alert('Booking deleted successfully');
                window.location.href = '/admin/bookings?format=html';
              } else {
                alert('Error deleting booking: ' + data.error);
              }
            })
            .catch(error => {
              console.error('Error:', error);
              alert('Error deleting booking');
            });
          }
        });
        
        document.getElementById('logoutBtn').addEventListener('click', function() {
          document.cookie = 'token=; Max-Age=0; path=/;';
          window.location.href = '/admin/login.html';
        });
        
        function getCookie(name) {
          const value = '; ' + document.cookie;
          const parts = value.split('; ' + name + '=');
          if (parts.length === 2) return parts.pop().split(';').shift();
        }
      </script>
    </body>
    </html>
  `;
};
