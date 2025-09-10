# Event Management System
This is a simple, front-end web application for managing and registering for events. It's built entirely with HTML, CSS, and vanilla JavaScript, using localStorage for data persistence. This project demonstrates core web development concepts without relying on external frameworks or libraries.

Features
Dynamic Home Page: A visually appealing home page with a background image and an animated heading.

Event Listings: Displays upcoming events in interactive cards, each with an image and name.

Event Details View: Clicking an event card takes the user to a dedicated page showing event details, including date, description, and available seats.

Real-time Seat Counter: The number of available seats updates automatically when a user registers. The "Register Now" button is blocked when seats are sold out.

User Authentication:

Student Login: Students can log in using their email and a temporary OTP (stored in localStorage).

Admin Login: A single, hardcoded admin account provides access to the management dashboard.

Admin Dashboard: A private section for administrators to create, manage, and delete events.

Student Idea Submission: A form for students to submit event ideas, which are then displayed on the admin dashboard for review.

User-friendly UI: The "Login" button changes to show the user's email after they log in, providing a personalized experience. A "Logout" option is available from a dropdown.

How to Run
Clone or download this repository.

Open the index.html file in your web browser.

No server or additional setup is required. The application uses your browser's localStorage to save all data.

Code Structure
The project is organized into three main files:

index.html: The main HTML file containing the structure for all pages and sections, including the home page, event details, login modals, and the admin dashboard.

style.css: The stylesheet that defines the look and feel of the entire application, including animations, card layouts, and modal pop-ups.

script.js: The core JavaScript file that handles all the dynamic functionality:

Data Management: Initializes and interacts with localStorage.

UI Manipulation: Dynamically updates the page content based on user actions and login status.

Event Listeners: Manages form submissions, button clicks, and navigation.

Admin Credentials
For testing purposes, the admin credentials are:

User ID: admin123

Password: password123

You can modify these directly in the script.js file if needed.
