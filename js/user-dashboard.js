







        document.addEventListener('DOMContentLoaded', function() {
    // --- Elements for Ride Booking & Fare Estimation ---
    const pickupInput = document.getElementById('pickupLocation');
    const dropInput = document.getElementById('dropLocation');
    const mouzaInput = document.getElementById('mouzaInput');
    const vehicleTypeRadios = document.querySelectorAll('input[name="vehicleType"]');
    const estDistanceSpan = document.getElementById('estDistance');
    const estTimeSpan = document.getElementById('estTime');
    const estFareSpan = document.getElementById('estFare');
    const fareEstimationSection = document.querySelector('.fare-estimation-section');
    const recalculateFareBtn = document.getElementById('recalculateFareBtn');
    const rideBookingForm = document.getElementById('rideBookingForm');

    // --- Elements for Current Ride ---
    const currentRideInfo = document.querySelector('#currentRideUser .current-ride-info');
    const noCurrentRideAlert = document.getElementById('noCurrentRideAlert');
    const cancelRideBtn = document.getElementById('cancelRideBtn');

    // --- Elements for Tabs ---
    var triggerTabList = [].slice.call(document.querySelectorAll('#userDashboardTabsContent .nav-link'));
    triggerTabList.forEach(function (triggerEl) {
        var tabTrigger = new bootstrap.Tab(triggerEl);
        triggerEl.addEventListener('click', function (event) {
            event.preventDefault();
            tabTrigger.show();
        });
    });

    // --- Functions for Fare Estimation ---
    function calculateFare() {
        const pickup = pickupInput.value.trim();
        const drop = dropInput.value.trim();
        let selectedVehicleType = 'Car';
        vehicleTypeRadios.forEach(radio => {
            if (radio.checked) {
                selectedVehicleType = radio.value;
            }
        });

        if (pickup && drop) {
            // Simulate API call for distance and time
            const distance = (Math.random() * 10 + 2).toFixed(1); // 2.0 to 12.0 km
            const time = Math.floor(Math.random() * 25) + 10;    // 10 to 35 min

            let baseFare = 50;
            let perKmRate = 12;
            if (selectedVehicleType === 'Auto') {
                baseFare = 30;
                perKmRate = 10;
            } else if (selectedVehicleType === 'Bike') {
                baseFare = 20;
                perKmRate = 8;
            }

            const estimatedFare = (baseFare + (distance * perKmRate)).toFixed(2);

            estDistanceSpan.textContent = `${distance} km`;
            estTimeSpan.textContent = `${time} min`;
            estFareSpan.textContent = `₹${estimatedFare}`;
            fareEstimationSection.style.display = 'block';
        } else {
            fareEstimationSection.style.display = 'none';
        }
    }

    // --- Event Listeners for Fare Estimation ---
    pickupInput.addEventListener('input', calculateFare);
    dropInput.addEventListener('input', calculateFare);
    mouzaInput.addEventListener('input', calculateFare); // Mouza might influence routing, so re-calculate
    vehicleTypeRadios.forEach(radio => {
        radio.addEventListener('change', calculateFare);
    });
    recalculateFareBtn.addEventListener('click', calculateFare);

    // --- Ride Booking Form Submission ---
    if (rideBookingForm) {
        rideBookingForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Searching for cabs and booking your ride!');
            // In a real app:
            // 1. Send booking request to backend
            // 2. On success, update UI to show current ride
            // 3. Switch to 'currentRideUser' tab programmatically
            simulateRideBooking();
            bootstrap.Tab.getInstance(document.getElementById('currentRideUser-tab')).show();
        });
    }

    // --- Simulate Current Ride Actions ---
    function simulateRideBooking() {
        noCurrentRideAlert.style.display = 'none';
        currentRideInfo.style.display = 'block';
        // You'd populate currentRideInfo with actual ride details from backend
    }

    if (cancelRideBtn) {
        cancelRideBtn.addEventListener('click', function() {
            if (confirm('Are you sure you want to cancel this ride?')) {
                alert('Ride cancelled!');
                // In a real app:
                // 1. Send cancellation request to backend
                // 2. On success, update UI to hide current ride and show "no active rides"
                currentRideInfo.style.display = 'none';
                noCurrentRideAlert.style.display = 'block';
            }
        });
    }

    // --- View E-Receipt Buttons ---
    document.querySelectorAll('.view-receipt-btn').forEach(button => {
        button.addEventListener('click', function() {
            const rideId = this.dataset.rideId;
            alert(`Displaying E-Receipt for Ride ID: ${rideId}. (In a real app, this would open a modal or new page)`);
            // You might open a modal with the e-receipt content here
        });
    });

    // --- Payment Methods Modal Submission ---
    const addPaymentModal = document.getElementById('addPaymentModal');
    if (addPaymentModal) {
        addPaymentModal.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('New payment method added! (Simulated)');
            bootstrap.Modal.getInstance(addPaymentModal).hide(); // Close modal
            // In a real app, you'd send card details to backend (securely!)
            // and refresh the payment methods list.
        });
    }

    // --- Initial State Check for Current Ride Tab ---
    // If the user lands on the dashboard, check if there's an active ride
    // This would typically come from backend data. For now, assume no active ride on load.
    if (currentRideInfo && noCurrentRideAlert) {
        if (currentRideInfo.style.display === 'none') { // If no current ride is displayed
            noCurrentRideAlert.style.display = 'block';
        }
    }
});