    // --- Event Filters & Search ---
    const eventSearchInput = document.getElementById('event-search');
    const eventCategoryFilter = document.getElementById('event-category-filter');

    let currentSearch = '';
    let currentCategory = 'all';

    eventSearchInput && eventSearchInput.addEventListener('input', (e) => {
        currentSearch = e.target.value.toLowerCase();
        renderEventCards();
    });

    eventCategoryFilter && eventCategoryFilter.addEventListener('change', (e) => {
        currentCategory = e.target.value;
        renderEventCards();
    });

document.addEventListener('DOMContentLoaded', () => {
    // Event Filters & Search
    const eventSearchInput = document.getElementById('event-search');
    const eventCategoryFilter = document.getElementById('event-category-filter');
    let currentSearch = '';
    let currentCategory = 'all';
    if (eventSearchInput) {
        eventSearchInput.addEventListener('input', (e) => {
            currentSearch = e.target.value.toLowerCase();
            renderEventCards();
        });
    }
    if (eventCategoryFilter) {
        eventCategoryFilter.addEventListener('change', (e) => {
            currentCategory = e.target.value;
            renderEventCards();
        });
    }
    // DOM Elements
    const heroWords = document.querySelectorAll('.word');
    const homeLink = document.getElementById('home-link');
    const loginBtn = document.getElementById('login-btn');
    const loginModal = document.getElementById('login-modal');
    const closeModalBtn = document.querySelector('.close-btn');
    const studentLoginForm = document.getElementById('student-login-form');
    const adminLoginForm = document.getElementById('admin-login-form');
    const adminLoginLink = document.getElementById('admin-login-link');
    const studentLoginLink = document.getElementById('student-login-link');
    const otpRequestForm = document.getElementById('otp-request-form');
    const otpVerifyForm = document.getElementById('otp-verify-form');
    const studentEmailInput = document.getElementById('student-email');
    const studentOtpInput = document.getElementById('student-otp');
    const studentMessage = document.getElementById('student-message');
    const adminLoginSubmit = document.getElementById('admin-login-form-submit');
    const adminUserIdInput = document.getElementById('admin-user-id');
    const adminPasswordInput = document.getElementById('admin-password');
    const adminMessage = document.getElementById('admin-message');
    const eventsSection = document.getElementById('events-section');
    const heroSection = document.getElementById('hero-section');
    const eventDetailsSection = document.getElementById('event-details-section');
    const eventCardsContainer = document.getElementById('event-cards-container');
    const adminDashboard = document.getElementById('admin-dashboard');
    const createEventForm = document.getElementById('create-event-form');
    const adminEventList = document.getElementById('admin-event-list');
    const registeredEventsLink = document.getElementById('registered-events-link');
    const messageModal = document.getElementById('message-modal');
    const messageCloseBtn = document.getElementById('message-close-btn');
    const modalMessageText = document.getElementById('modal-message-text');
    const mainNav = document.querySelector('.main-nav ul');
    // New DOM Elements for student ideas
    const studentIdeasSection = document.getElementById('student-ideas-section');
    const ideaSubmissionForm = document.getElementById('idea-submission-form');
    const ideaTitleInput = document.getElementById('idea-title');
    const ideaDescriptionInput = document.getElementById('idea-description');
    const ideaBoard = document.getElementById('idea-board');

    // --- Core Functions ---

    function initializeData() {
        if (!localStorage.getItem('events')) {
            const initialEvents = [
                { id: 1, name: 'AI & Robotics Summit', imageUrl: 'https://images.unsplash.com/photo-1518770660439-46e382c16110?q=80&w=2070&auto=format', date: '2025-10-25', description: 'A deep dive into the latest advancements in artificial intelligence and robotics.', seats: 150, availableSeats: 150 },
                { id: 2, name: 'Global Music Festival', imageUrl: 'https://images.unsplash.com/photo-1490109962388-1ac495a62f83?q=80&w=2070&auto=format', date: '2025-11-15', description: 'Experience a fusion of cultures and music from around the world.', seats: 500, availableSeats: 500 },
                { id: 3, name: 'Startup Pitch Day', imageUrl: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=2070&auto=format', date: '2025-12-05', description: 'Listen to innovative ideas and witness the next big thing in tech.', seats: 75, availableSeats: 75 }
            ];
            localStorage.setItem('events', JSON.stringify(initialEvents));
        }

        if (!localStorage.getItem('admin')) {
            const admin = { id: 'admin123', password: 'password123' };
            localStorage.setItem('admin', JSON.stringify(admin));
        }
        
        if (!localStorage.getItem('registeredUsers')) {
            localStorage.setItem('registeredUsers', JSON.stringify({}));
        }
        
        if (!localStorage.getItem('registeredEvents')) {
            localStorage.setItem('registeredEvents', JSON.stringify({}));
        }
    }

    function getEvents() {
        return JSON.parse(localStorage.getItem('events')) || [];
    }
    
    function setEvents(events) {
        localStorage.setItem('events', JSON.stringify(events));
    }
    
    function getRegisteredEvents() {
        return JSON.parse(localStorage.getItem('registeredEvents')) || {};
    }
    
    function setRegisteredEvents(registeredEvents) {
        localStorage.setItem('registeredEvents', JSON.stringify(registeredEvents));
    }
    
    function renderEventCards() {
        eventCardsContainer.innerHTML = '';
        const events = getEvents();
        let filteredEvents = events;
        // Use local variables for search and category
        let searchValue = '';
        let categoryValue = 'all';
        if (typeof eventSearchInput !== 'undefined' && eventSearchInput) {
            searchValue = eventSearchInput.value.toLowerCase();
        }
        if (typeof eventCategoryFilter !== 'undefined' && eventCategoryFilter) {
            categoryValue = eventCategoryFilter.value;
        }
        // Filter by category
        if (categoryValue && categoryValue !== 'all') {
            filteredEvents = filteredEvents.filter(ev => (ev.category || '').toLowerCase() === categoryValue);
        }
        // Filter by search
        if (searchValue) {
            filteredEvents = filteredEvents.filter(ev =>
                ev.name.toLowerCase().includes(searchValue) ||
                (ev.description && ev.description.toLowerCase().includes(searchValue))
            );
        }
        if (filteredEvents.length === 0) {
            eventCardsContainer.innerHTML = '<p>No events match your search or filter.</p>';
        } else {
            filteredEvents.forEach(event => {
                const card = document.createElement('div');
                card.className = 'event-card';
                card.dataset.id = event.id;
                card.setAttribute('data-event-date', event.date);
                card.innerHTML = `
                    <img src="${event.imageUrl}" alt="${event.name}">
                    <div class="card-content">
                        <h3>${event.name}</h3>
                        <div class="countdown-timer"></div>
                    </div>
                `;
                eventCardsContainer.appendChild(card);
            });
            initializeCountdownTimers();
        }
// Countdown timer for event cards
function initializeCountdownTimers() {
    const cards = document.querySelectorAll('.event-card[data-event-date]');
    cards.forEach(card => {
        const eventDateStr = card.getAttribute('data-event-date');
        const countdownEl = card.querySelector('.countdown-timer');
        if (!countdownEl) return;
        function updateCountdown() {
            const now = new Date();
            const eventDate = new Date(eventDateStr);
            const diff = eventDate - now;
            if (diff <= 0) {
                countdownEl.textContent = "Event is Live!";
                clearInterval(intervalId);
                return;
            }
            const days = Math.floor(diff / (1000 * 60 * 60 * 24));
            const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
            const minutes = Math.floor((diff / (1000 * 60)) % 60);
            const seconds = Math.floor((diff / 1000) % 60);
            countdownEl.textContent = `${days}d ${hours}h ${minutes}m ${seconds}s left`;
        }
        updateCountdown();
        const intervalId = setInterval(updateCountdown, 1000);
    });
}
    }
    
    function showEventDetails(eventId) {
        const events = getEvents();
        const event = events.find(e => e.id == eventId);
        
        if (event) {
            hideAllSections();
            eventDetailsSection.style.display = 'block';
            
            eventDetailsSection.innerHTML = `
                <div class="event-details-content">
                    <button class="back-btn" id="back-to-home">Back to Events</button>
                    <h2>${event.name}</h2>
                    <p><strong>Date:</strong> ${event.date}</p>
                    <img src="${event.imageUrl}" alt="${event.name}">
                    <p>${event.description}</p>
                    <p><strong>Seats Available:</strong> <span id="seats-available">${event.availableSeats}</span></p>
                    <button class="register-btn" id="register-now-btn">Register Now</button>
                </div>
            `;
            
            document.getElementById('back-to-home').addEventListener('click', () => {
                showHomePage();
            });

            const registerBtn = document.getElementById('register-now-btn');
            const seatsSpan = document.getElementById('seats-available');
            
            if (event.availableSeats <= 0) {
                registerBtn.disabled = true;
                registerBtn.textContent = 'Sold Out';
            }
            
            registerBtn.addEventListener('click', () => {
                const loggedInUser = localStorage.getItem('currentUser');
                if (!loggedInUser) {
                    showMessage('Please log in to register for an event.');
                    showLoginModal();
                    return;
                }
                
                const registeredEvents = getRegisteredEvents();
                if (!registeredEvents[loggedInUser]) {
                    registeredEvents[loggedInUser] = [];
                }
                
                if (registeredEvents[loggedInUser].includes(event.id)) {
                    showMessage('You have already registered for this event.');
                    return;
                }
                
                if (event.availableSeats > 0) {
                    event.availableSeats--;
                    setEvents(events);
                    seatsSpan.textContent = event.availableSeats;
                    registeredEvents[loggedInUser].push(event.id);
                    setRegisteredEvents(registeredEvents);
                    showMessage('Registration successful!');
                    renderEventCards(); // Refresh all event cards to update seat bar and count
                    if (event.availableSeats <= 0) {
                        registerBtn.disabled = true;
                        registerBtn.textContent = 'Sold Out';
                    }
                } else {
                    showMessage('Sorry, this event is sold out.');
                    registerBtn.disabled = true;
                    registerBtn.textContent = 'Sold Out';
                }
            });
        }
    }
    
    function renderAdminEvents() {
        adminEventList.innerHTML = '';
        const events = getEvents();
        events.forEach(event => {
            const li = document.createElement('li');
            li.innerHTML = `
                <span><strong>${event.name}</strong> (${event.availableSeats} / ${event.seats} seats left) <br>
                <span style="color:#e67e22;font-size:0.95em;">Category: ${event.category ? event.category.charAt(0).toUpperCase() + event.category.slice(1) : 'N/A'}</span></span>
                <div class="buttons">
                    <button class="delete-btn" data-id="${event.id}">Delete</button>
                </div>
            `;
            adminEventList.appendChild(li);
        });
    }

    function hideAllSections() {
        heroSection.style.display = 'none';
        eventsSection.style.display = 'none';
        eventDetailsSection.style.display = 'none';
        adminDashboard.style.display = 'none';
    }

    function showHomePage() {
        hideAllSections();
        heroSection.style.display = 'flex';
        eventsSection.style.display = 'block';
        renderEventCards();
    }

    function showAdminDashboard() {
        hideAllSections();
        adminDashboard.style.display = 'block';
        renderAdminEvents();
    }

    function showLoginModal() {
        loginModal.style.display = 'block';
        studentLoginForm.style.display = 'block';
        adminLoginForm.style.display = 'none';
        studentMessage.textContent = '';
        adminMessage.textContent = '';
        otpRequestForm.style.display = 'block';
        otpVerifyForm.style.display = 'none';
        otpRequestForm.reset();
        otpVerifyForm.reset();
    }

    function showMessage(message) {
        modalMessageText.textContent = message;
        messageModal.style.display = 'block';
    }

    // --- New UI Functions ---
    function updateHeaderUI() {
        const currentUser = localStorage.getItem('currentUser');
        const loggedInUserElement = document.getElementById('logged-in-user-menu');

        // Remove any previously created elements
        if (loggedInUserElement) {
            loggedInUserElement.remove();
        }

        // Check if a user is logged in
        if (currentUser) {
            // Create a new menu for the logged-in user
            const userMenu = document.createElement('li');
            userMenu.id = 'logged-in-user-menu';
            userMenu.className = 'dropdown-container';
            userMenu.innerHTML = `
                <a href="#" class="user-link">${currentUser === 'admin' ? 'Admin' : currentUser}</a>
                <ul class="dropdown-menu">
                    <li><a href="#" id="logout-btn">Logout</a></li>
                </ul>
            `;
            
            // Replace the login button with the new user menu
            loginBtn.style.display = 'none';
            mainNav.appendChild(userMenu);

            // Add event listeners for the new elements
            document.getElementById('logout-btn').addEventListener('click', handleLogout);
            document.querySelector('.user-link').addEventListener('click', (e) => {
                e.preventDefault();
                // Optional: Toggle the dropdown menu visibility
                const dropdownMenu = document.querySelector('.dropdown-menu');
                dropdownMenu.style.display = dropdownMenu.style.display === 'block' ? 'none' : 'block';
            });

        } else {
            // If no user is logged in, show the original login button
            loginBtn.style.display = 'block';
        }
    }

    function handleLogout(e) {
        e.preventDefault();
        localStorage.removeItem('currentUser');
        showMessage('You have been logged out.');
        updateHeaderUI(); // Update UI to reflect logout
        showHomePage(); // Redirect to home page
    }

    // --- Event Handlers ---
    
    // Hero text animation
    heroWords.forEach((word, index) => {
        word.style.animationDelay = `${index * 0.2}s`;
    });
    
    // Header navigation links
    homeLink.addEventListener('click', (e) => {
        e.preventDefault();
        showHomePage();
    });

    registeredEventsLink.addEventListener('click', (e) => {
        e.preventDefault();
        const currentUser = localStorage.getItem('currentUser');
        if (!currentUser || currentUser === 'admin') {
            showMessage('Please log in as a student to view your registered events.');
            showLoginModal();
            return;
        }

        const registeredEvents = getRegisteredEvents()[currentUser] || [];
        const allEvents = getEvents();
        const userEvents = allEvents.filter(event => registeredEvents.includes(event.id));

        hideAllSections();
        eventsSection.style.display = 'block';
        eventCardsContainer.innerHTML = '';
        if (userEvents.length === 0) {
            eventCardsContainer.innerHTML = '<p>You have not registered for any events yet.</p>';
        } else {
            userEvents.forEach(event => {
                const card = document.createElement('div');
                card.className = 'event-card';
                card.dataset.id = event.id;
                card.innerHTML = `
                    <img src="${event.imageUrl}" alt="${event.name}">
                    <div class="card-content">
                        <h3>${event.name}</h3>
                        <p>Registered</p>
                        <button class="cancel-btn" data-id="${event.id}">Cancel</button>
                        <div class="seat-bar" id="seat-bar-${event.id}"></div>
                    </div>
                `;
                eventCardsContainer.appendChild(card);
                updateSeatBar(event.id, event.availableSeats, event.seats);
            });
            // Cancel button logic
            document.querySelectorAll('.cancel-btn').forEach(btn => {
                btn.addEventListener('click', function(e) {
                    const eventId = parseInt(e.target.dataset.id);
                    const currentUser = localStorage.getItem('currentUser');
                    const registeredEvents = getRegisteredEvents();
                    let events = getEvents();
                    // Remove event from user's registered list
                    if (registeredEvents[currentUser]) {
                        registeredEvents[currentUser] = registeredEvents[currentUser].filter(id => id !== eventId);
                        setRegisteredEvents(registeredEvents);
                    }
                    // Increase available seats for the event
                    events = events.map(ev => {
                        if (ev.id === eventId) {
                            ev.availableSeats = Math.min(ev.availableSeats + 1, ev.seats);
                        }
                        return ev;
                    });
                    setEvents(events);
                    // Refresh registered events view
                    registeredEventsLink.click();
                    // Refresh all events view (so event is visible again)
                    renderEventCards();
                });
            });
        }
// Helper to update seat bar
function updateSeatBar(eventId, availableSeats, totalSeats) {
    const bar = document.getElementById(`seat-bar-${eventId}`);
    if (!bar) return;
    const percent = Math.round((availableSeats / totalSeats) * 100);
    let color = '#4caf50';
    if (percent < 30) color = '#f44336';
    else if (percent < 60) color = '#ff9800';
    bar.style.width = '100%';
    bar.style.height = '8px';
    bar.style.background = '#eee';
    bar.innerHTML = `<div style="width:${percent}%;height:100%;background:${color};border-radius:4px;"></div>`;
}
    });

    // Login modal
    loginBtn.addEventListener('click', (e) => {
        e.preventDefault();
        showLoginModal();
    });
    
    closeModalBtn.addEventListener('click', () => {
        loginModal.style.display = 'none';
    });
    
    window.addEventListener('click', (e) => {
        if (e.target === loginModal) {
            loginModal.style.display = 'none';
        }
    });

    adminLoginLink.addEventListener('click', (e) => {
        e.preventDefault();
        studentLoginForm.style.display = 'none';
        adminLoginForm.style.display = 'block';
    });

    studentLoginLink.addEventListener('click', (e) => {
        e.preventDefault();
        adminLoginForm.style.display = 'none';
        studentLoginForm.style.display = 'block';
    });

    // Password-based student login
    studentLoginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('student-email').value;
        const password = document.getElementById('student-password').value;
        let users = JSON.parse(localStorage.getItem('registeredUsers') || '{}');
        if (users[email] && users[email].password === password) {
            localStorage.setItem('currentUser', email);
            studentMessage.style.color = 'green';
            studentMessage.textContent = 'Login successful!';
            setTimeout(() => {
                loginModal.style.display = 'none';
                updateHeaderUI();
                showHomePage();
            }, 1000);
        } else {
            studentMessage.style.color = 'red';
            studentMessage.textContent = 'Invalid email or password.';
        }
    });

    // Show registration form link
    document.getElementById('show-register-link').addEventListener('click', (e) => {
        e.preventDefault();
        studentLoginForm.style.display = 'none';
        document.getElementById('student-register-form').style.display = 'block';
    });

    // Show login form link from registration
    document.getElementById('show-login-link').addEventListener('click', (e) => {
        e.preventDefault();
        document.getElementById('student-register-form').style.display = 'none';
        studentLoginForm.style.display = 'block';
    });

    // Student registration logic
    document.getElementById('student-register-form').addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('register-email').value;
        const password = document.getElementById('register-password').value;
        let users = JSON.parse(localStorage.getItem('registeredUsers') || '{}');
        if (users[email]) {
            document.getElementById('register-message').style.color = 'red';
            document.getElementById('register-message').textContent = 'Email already registered.';
        } else {
            users[email] = { password };
            localStorage.setItem('registeredUsers', JSON.stringify(users));
            document.getElementById('register-message').style.color = 'green';
            document.getElementById('register-message').textContent = 'Registration successful! You can now log in.';
            setTimeout(() => {
                document.getElementById('student-register-form').style.display = 'none';
                studentLoginForm.style.display = 'block';
            }, 1200);
        }
    });

    // Admin Login
    adminLoginSubmit.addEventListener('submit', (e) => {
        e.preventDefault();
        const adminData = JSON.parse(localStorage.getItem('admin'));
        if (adminUserIdInput.value === adminData.id && adminPasswordInput.value === adminData.password) {
            localStorage.setItem('currentUser', 'admin');
            adminMessage.style.color = 'green';
            adminMessage.textContent = 'Admin login successful!';
            setTimeout(() => {
                loginModal.style.display = 'none';
                updateHeaderUI();
                showAdminDashboard();
            }, 1000);
        } else {
            adminMessage.style.color = 'red';
            adminMessage.textContent = 'Invalid credentials.';
        }
    });
    
    // Event card click listener
    eventCardsContainer.addEventListener('click', (e) => {
        const card = e.target.closest('.event-card');
        if (card) {
            showEventDetails(card.dataset.id);
        }
    });

    // Admin Dashboard event management
    createEventForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const events = getEvents();
        const newEvent = {
            id: events.length > 0 ? Math.max(...events.map(e => e.id)) + 1 : 1,
            name: document.getElementById('event-name').value,
            imageUrl: document.getElementById('event-image-url').value,
            date: document.getElementById('event-date').value,
            category: document.getElementById('event-category').value,
            description: document.getElementById('event-description').value,
            seats: parseInt(document.getElementById('event-seats').value),
            availableSeats: parseInt(document.getElementById('event-seats').value),
        };
        events.push(newEvent);
        setEvents(events);
        renderAdminEvents();
        createEventForm.reset();
        renderEventCards();
    });

    adminEventList.addEventListener('click', (e) => {
        const target = e.target;
        const eventId = target.dataset.id;
        let events = getEvents();

        if (target.classList.contains('delete-btn')) {
            if (confirm('Are you sure you want to delete this event?')) {
                events = events.filter(event => event.id != eventId);
                setEvents(events);
                renderAdminEvents();
                renderEventCards();
            }
        }
    });
    
    // Message modal close listener
    messageCloseBtn.addEventListener('click', () => {
        messageModal.style.display = 'none';
    });

    window.addEventListener('click', (e) => {
        if (e.target === messageModal) {
            messageModal.style.display = 'none';
        }
    });
    
    // Initial page load
    initializeData();
    showHomePage();
    updateHeaderUI(); // Initial check for logged-in user
});
function initializeIdeaData() {
        if (!localStorage.getItem('studentIdeas')) {
            localStorage.setItem('studentIdeas', JSON.stringify([]));
        }
    }

    function renderIdeaCards() {
        ideaBoard.innerHTML = '<h3>Student Idea Board</h3>'; // Reset the board
        const ideas = JSON.parse(localStorage.getItem('studentIdeas')) || [];
        if (ideas.length === 0) {
            ideaBoard.innerHTML += '<p style="text-align: center;">No ideas have been submitted yet. Be the first!</p>';
        } else {
            ideas.forEach(idea => {
                const ideaCard = document.createElement('div');
                ideaCard.className = 'idea-card';
                ideaCard.innerHTML = `
                    <h4>${idea.title}</h4>
                    <p>${idea.description}</p>
                    <p><small>Submitted by: ${idea.userEmail}</small></p>
                `;
                ideaBoard.appendChild(ideaCard);
            });
        }
    }
    
// In renderEventCards:
card.innerHTML = `
    <img src="${event.imageUrl}" alt="${event.name}">
    <div class="card-content">
        <h3>${event.name}</h3>
        <div class="countdown-timer" id="countdown-${event.id}"></div>
    </div>
`;
eventCardsContainer.appendChild(card);
startCountdown(`countdown-${event.id}`, event.date);
function initializeCountdownTimers() {
    const cards = document.querySelectorAll('.event-card[data-event-date]');
    cards.forEach(card => {
        const eventDateStr = card.getAttribute('data-event-date');
        const countdownEl = card.querySelector('.countdown-timer');
        if (!countdownEl) return;

        function updateCountdown() {
            const now = new Date();
            const eventDate = new Date(eventDateStr);
            const diff = eventDate - now;
            if (diff <= 0) {
                countdownEl.textContent = "Event is Live!";
                clearInterval(intervalId);
                return;
            }
            const days = Math.floor(diff / (1000 * 60 * 60 * 24));
            const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
            const minutes = Math.floor((diff / (1000 * 60)) % 60);
            const seconds = Math.floor((diff / 1000) % 60);
            countdownEl.textContent = `${days}d ${hours}h ${minutes}m ${seconds}s left`;
        }

        updateCountdown();
        const intervalId = setInterval(updateCountdown, 1000);
    });
}

// Call this after rendering event cards
initializeCountdownTimers();