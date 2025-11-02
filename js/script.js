document.addEventListener('DOMContentLoaded', function() {
    // --- User/Driver Tab Switching on Homepage (for initial interaction) ---
    const homepageUserTab = document.getElementById('userTab');
    const homepageDriverTab = document.getElementById('driverTab');
    const homepageUserLoginForm = document.getElementById('homepageUserLoginForm');

    if (homepageUserTab && homepageDriverTab) {
        homepageUserTab.addEventListener('click', function() {
            // Activate User tab, potentially show user login form
            homepageUserTab.classList.add('active');
            homepageDriverTab.classList.remove('active');
            homepageUserLoginForm.style.display = 'block'; // Ensure user form is visible
            // You might change the button text/action for driver here if needed
        });

        homepageDriverTab.addEventListener('click', function() {
            // Redirect to driver-auth.html when "Driver" is clicked
            window.location.href = 'driver-auth.html';
        });
    }

    // --- Homepage Ride Booking Form Submission ---
    // This form on the homepage would typically redirect to the user dashboard
    // with pre-filled details or directly to a search results page.
    const homepageRideBookingForm = document.querySelector('.ride-booking-card form');
    if (homepageRideBookingForm) {
        homepageRideBookingForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const pickup = document.getElementById('pickupLocation').value;
            const drop = document.getElementById('dropLocation').value;
            const mouza = document.getElementById('mouzaInput').value;

            if (pickup && drop) {
                alert(`Searching for cabs from ${pickup} to ${drop} (Mouza: ${mouza || 'N/A'})!`);
                // In a real application, you might redirect to a user dashboard
                // or a ride search results page with these parameters.
                // For now, let's redirect to the user-dashboard for simplicity after booking.
                window.location.href = 'user-dashboard.html';
            } else {
                alert('Please enter both pickup and drop locations.');
            }
        });
    }

    // --- Smooth Scrolling for Anchor Links (Optional, if you add them) ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // --- Active state for "Our Services" buttons (client-side only for visual feedback) ---
    document.querySelectorAll('.our-services-section .btn-outline-primary').forEach(button => {
        button.addEventListener('click', function() {
            document.querySelectorAll('.our-services-section .btn-outline-primary').forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            // In a real app, this would filter the services displayed below or fetch new content.
        });
    });
});










// Function to load header and footer dynamically
function loadComponent(id, file) {
  fetch(file)
    .then(response => response.text())
    .then(data => {
      document.getElementById(id).innerHTML = data;
    })
    .catch(error => console.error(`Error loading ${file}:`, error));
}

// Load header and footer
loadComponent("header", "header.html");
loadComponent("footer", "footer.html");






































































