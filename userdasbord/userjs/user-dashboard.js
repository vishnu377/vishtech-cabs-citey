






document.addEventListener('DOMContentLoaded', function() {
    // --- Elements for Ride Booking & Fare Estimation ---
    const pickupLocationInput = document.getElementById('pickupLocation');
    const dropLocationInput = document.getElementById('dropLocation');
    const vehicleTypeSelection = document.getElementById('vehicleTypeSelection');
    const fareEstimationSection = document.getElementById('fareEstimationSection');
    const estDistance = document.getElementById('estDistance');
    const estTime = document.getElementById('estTime');
    const estFare = document.getElementById('estFare');
    const recalculateFareBtn = document.getElementById('recalculateFareBtn');
    const rideBookingForm = document.getElementById('rideBookingForm');
    const findCabsBtn = document.getElementById('findCabsBtn'); // Ensure this element exists

    // --- Elements for Ride Finding Spinner and Ride Found Card ---
    const findingRideSpinner = document.getElementById('findingRideSpinner');
    const rideFoundCard = document.getElementById('rideFoundCard');
    const confirmRideBtn = document.getElementById('confirmRideBtn');
    const cancelFindingBtn = document.getElementById('cancelFindingBtn');
    const foundVehicleType = document.getElementById('foundVehicleType');
    const foundVehicleNumber = document.getElementById('foundVehicleNumber');
    const finalFare = document.getElementById('finalFare');

    // --- Elements for Current Ride Tab ---
    const activeRideDetails = document.getElementById('activeRideDetails');
    const noCurrentRideAlert = document.getElementById('noCurrentRideAlert');
    const currentRideID = document.getElementById('currentRideID');
    const currentDriverName = document.getElementById('currentDriverName');
    const currentDriverVehicleType = document.getElementById('currentDriverVehicleType');
    const currentDriverRating = document.getElementById('currentDriverRating');
    const currentPickupLocation = document.getElementById('currentPickupLocation');
    const currentDropLocation = document.getElementById('currentDropLocation');
    const currentRideFare = document.getElementById('currentRideFare');
    const currentRideStatus = document.getElementById('currentRideStatus');
    const cancelActiveRideBtn = document.getElementById('cancelActiveRideBtn');

    // --- Elements for Parcel Booking Tab ---
    const parcelBookingForm = document.getElementById('parcelBookingForm');

    // --- Tab Switching Logic ---
    const triggerTabList = [].slice.call(document.querySelectorAll('.user-sidebar .nav-link, .dropdown-menu .dropdown-item'));
    triggerTabList.forEach(function (triggerEl) {
        triggerEl.addEventListener('click', function (event) {
            event.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId.startsWith('#')) {
                const targetTab = document.querySelector(targetId + '-tab');
                if (targetTab) {
                    const bsTab = new bootstrap.Tab(targetTab);
                    bsTab.show();
                } else if (targetId === '#profileSettings' || targetId === '#rideHistory' || targetId === '#notifications') {
                    // For dropdown items that directly map to existing tabs,
                    // ensure the sidebar tab is also activated
                    const sidebarTab = document.querySelector(`[href="${targetId}"]`);
                    if (sidebarTab) {
                        const bsTab = new bootstrap.Tab(sidebarTab);
                        bsTab.show();
                    }
                }
            }
        });
    });


    // --- Function to simulate fare calculation (simple example) ---
    function calculateFare(distance, vehicleType) {
        let baseFare = 50; // Base fare in INR
        let perKmRate;
        let timeFactor;

        switch (vehicleType) {
            case 'Car':
                perKmRate = 12;
                timeFactor = 1.5;
                break;
            case 'Auto':
                perKmRate = 8;
                timeFactor = 1.2;
                break;
            case 'Bike':
                perKmRate = 5;
                timeFactor = 1;
                break;
            default:
                perKmRate = 10; // Defaulting to car rates if somehow not selected
                timeFactor = 1.3;
        }

        const estimatedFare = baseFare + (distance * perKmRate) + (distance * timeFactor);
        return estimatedFare.toFixed(2);
    }

    // --- Function to update fare estimation section ---
    function updateFareEstimation() {
        const pickup = pickupLocationInput.value.trim();
        const drop = dropLocationInput.value.trim();
        const selectedVehicleElement = document.querySelector('input[name="vehicleType"]:checked');
        const selectedVehicle = selectedVehicleElement ? selectedVehicleElement.value : 'Car'; // Default to Car if none selected

        if (pickup && drop) {
            // Simulate distance and time
            const distance = (Math.random() * 10 + 3).toFixed(1); // 3-13 km
            const time = Math.floor(Math.random() * 20) + 10; // 10-30 mins

            estDistance.textContent = `${distance} km`;
            estTime.textContent = `${time}-${time + 5} mins`;
            estFare.textContent = `₹${calculateFare(parseFloat(distance), selectedVehicle)}`;
            fareEstimationSection.style.display = 'block';
        } else {
            fareEstimationSection.style.display = 'none';
        }
    }

    // --- Event listeners for fare calculation ---
    pickupLocationInput.addEventListener('input', updateFareEstimation);
    dropLocationInput.addEventListener('input', updateFareEstimation);
    vehicleTypeSelection.addEventListener('change', updateFareEstimation);
    recalculateFareBtn.addEventListener('click', updateFareEstimation);


    // --- Handle "Find Cabs & Book" button click ---
    rideBookingForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent default form submission

        const pickup = pickupLocationInput.value.trim();
        const drop = dropLocationInput.value.trim();
        const selectedVehicle = document.querySelector('input[name="vehicleType"]:checked').value;

        if (!pickup || !drop) {
            alert('Please enter both pickup and drop locations.');
            return;
        }

        // Hide form and show spinner
        rideBookingForm.style.display = 'none';
        findingRideSpinner.style.display = 'flex'; // Use flex for centering content
        rideFoundCard.style.display = 'none'; // Ensure ride found card is hidden

        // Simulate API call to find a cab
        setTimeout(() => {
            findingRideSpinner.style.display = 'none'; // Hide spinner

            // Populate ride found card with simulated data
            foundVehicleType.textContent = selectedVehicle;
            foundVehicleNumber.textContent = getRandomVehicleNumber(selectedVehicle);
            finalFare.textContent = estFare.textContent; // Use the estimated fare

            rideFoundCard.style.display = 'block'; // Show ride found card
        }, 3000); // Simulate 3 seconds search time
    });

    // --- Generate random vehicle number based on type ---
    function getRandomVehicleNumber(vehicleType) {
        let prefix = 'DL';
        let num1 = Math.floor(Math.random() * 99) + 1; // 1-99
        let chars = String.fromCharCode(65 + Math.floor(Math.random() * 26)) + String.fromCharCode(65 + Math.floor(Math.random() * 26)); // Two random uppercase letters
        let num2 = Math.floor(Math.random() * 9999) + 1000; // 1000-9999

        if (vehicleType === 'Auto') prefix = 'UP'; // Example for auto
        if (vehicleType === 'Bike') prefix = 'HR'; // Example for bike

        return `${prefix} ${num1 < 10 ? '0' + num1 : num1} ${chars} ${num2}`;
    }

    // --- Handle "Confirm Ride" button click ---
    confirmRideBtn.addEventListener('click', function() {
        rideFoundCard.style.display = 'none'; // Hide ride found card

        // Simulate booking confirmation and update current ride tab
        noCurrentRideAlert.style.display = 'none';
        activeRideDetails.style.display = 'block';

        currentRideID.textContent = `Ride ID: #US${Date.now().toString().slice(-7)}`; // Unique ID
        currentDriverName.textContent = 'Dinesh K.';
        currentDriverVehicleType.textContent = foundVehicleType.textContent;
        currentDriverRating.textContent = '4.9'; // Assuming fixed for this example
        currentPickupLocation.textContent = pickupLocationInput.value;
        currentDropLocation.textContent = dropLocationInput.value;
        currentRideFare.textContent = finalFare.textContent;
        currentRideStatus.textContent = 'En Route';
        currentRideStatus.classList.remove('bg-info', 'bg-warning', 'bg-success', 'bg-danger'); // Clean old classes
        currentRideStatus.classList.add('bg-primary');


        // Reset booking form fields (optional)
        rideBookingForm.reset();
        fareEstimationSection.style.display = 'none'; // Hide fare estimation
        rideBookingForm.style.display = 'block'; // Show the booking form again for new bookings

        // Switch to Current Ride tab programmatically
        const currentRideTabElement = document.getElementById('currentRideUser-tab');
        if (currentRideTabElement) {
            const bsTab = new bootstrap.Tab(currentRideTabElement);
            bsTab.show();
        }
    });

    // --- Handle "Cancel" button click (from ride found card) ---
    cancelFindingBtn.addEventListener('click', function() {
        rideFoundCard.style.display = 'none'; // Hide ride found card
        rideBookingForm.style.display = 'block'; // Show the booking form again
        fareEstimationSection.style.display = 'none'; // Also hide fare estimation
        rideBookingForm.reset(); // Clear form
        // Ensure "Book a Ride" tab is active if user was on it
        const bookRideTabElement = document.getElementById('bookRide-tab');
        if (bookRideTabElement) {
            const bsTab = new bootstrap.Tab(bookRideTabElement);
            bsTab.show();
        }
    });

    // --- Handle "Cancel Ride" button click (from current ride tab) ---
    cancelActiveRideBtn.addEventListener('click', function() {
        if (confirm('Are you sure you want to cancel your current ride?')) {
            activeRideDetails.style.display = 'none';
            noCurrentRideAlert.style.display = 'block';
            alert('Your ride has been cancelled.');
            // Optionally switch back to "Book a Ride"
            const bookRideTabElement = document.getElementById('bookRide-tab');
            if (bookRideTabElement) {
                const bsTab = new bootstrap.Tab(bookRideTabElement);
                bsTab.show();
            }
        }
    });

    // --- Initial state check for Current Ride Tab ---
    // On load, assume no active ride. This can be updated by an actual backend check.
    activeRideDetails.style.display = 'none';
    noCurrentRideAlert.style.display = 'block';

    // --- Event listener for the "Book a Parcel" tab link ---
    document.getElementById('bookParcel-tab').addEventListener('click', function() {
        // Hide elements related to ride booking when switching to Parcel tab
        fareEstimationSection.style.display = 'none';
        findingRideSpinner.style.display = 'none';
        rideFoundCard.style.display = 'none';
        // Ensure ride booking form is visible IF user returns to ride booking, but not now
        // rideBookingForm.style.display = 'block';
    });

    // --- Parcel Booking Form Logic (minimal) ---
    if (parcelBookingForm) {
        parcelBookingForm.addEventListener('submit', function(event) {
            event.preventDefault();
            const senderLoc = document.getElementById('parcelSenderLocation').value;
            const receiverLoc = document.getElementById('parcelReceiverLocation').value;
            const weight = document.getElementById('parcelWeight').value;

            if (senderLoc && receiverLoc && weight) {
                alert(`Parcel delivery from ${senderLoc} to ${receiverLoc} (${weight} kg) requested! We are finding a delivery partner.`);
                parcelBookingForm.reset(); // Clear form after submission
            } else {
                alert('Please fill in all required parcel details.');
            }
        });
    }

    // --- Ride History E-Receipt Buttons ---
    document.querySelectorAll('.view-receipt-btn').forEach(button => {
        button.addEventListener('click', function() {
            const rideId = this.dataset.rideId;
            alert(`Displaying E-Receipt for Ride ID: ${rideId}. (In a real app, this would open a modal or new page with the receipt details)`);
            // Here you'd typically fetch the receipt data for `rideId` and display it
        });
    });

    // --- Add Payment Method Modal Form Submission ---
    const addPaymentModalElement = document.getElementById('addPaymentModal');
    if (addPaymentModalElement) {
        addPaymentModalElement.addEventListener('submit', function(e) {
            e.preventDefault(); // Prevent actual form submission

            const cardNumber = document.getElementById('cardNumber').value;
            const expiryDate = document.getElementById('expiryDate').value;
            const cvv = document.getElementById('cvv').value;
            const cardHolderName = document.getElementById('cardHolderName').value;

            if (cardNumber && expiryDate && cvv && cardHolderName) {
                alert('New payment card added securely! (Simulated)');
                const modal = bootstrap.Modal.getInstance(addPaymentModalElement);
                if (modal) {
                    modal.hide(); // Close modal
                }
                // In a real application, you would send this data to your backend
                // securely (e.g., via a payment gateway tokenization service).
                // Then you'd refresh the list of payment methods displayed.
            } else {
                alert('Please fill in all card details.');
            }
        });
    }

    // Call updateFareEstimation initially to handle any pre-filled data or default state
    updateFareEstimation();
});