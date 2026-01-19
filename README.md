# 📘 Cahier de Charges – **iDoctor Mobile Application** (Simple Version)

## 1. General Presentation

**Application Name:** iDoctor
**Platform:** Mobile Application (Android & iOS)
**Application Type:** Medical appointment & consultation app
**Target Version:** MVP – Simple & Educational

**Main Objective:**
The goal of the iDoctor application is to simplify the interaction between patients and doctors by providing an easy-to-use mobile platform for searching doctors, booking appointments, and communicating through basic chat consultation.

---

## 2. Target Users

### 👤 Patient

* Search for doctors by specialty
* View doctor profiles
* Book medical appointments
* Chat with doctors
* Manage personal profile

### 🧑‍⚕️ Doctor

* Create professional profile
* Manage availability
* View and confirm appointments
* Chat with patients

## 3. Scope of the Application

This version of iDoctor is intentionally kept simple and focuses only on the core features needed to demonstrate a functional healthcare booking system. Advanced features such as video calls, payments, and medical records are excluded from this phase.

---

## 4. Functional Requirements

### 4.1 Authentication & Authorization

* User registration (Patient / Doctor)
* User login with email and password
* Secure authentication using JWT
* Role-based access (Patient / Doctor)

### 4.2 Doctor Management

* Doctors can create a professional profile
* Profile includes specialty, description, and availability
* Doctors appear in the public doctor list

### 4.3 Appointment Management

* Patients can book appointments
* Doctors can view appointment requests
* Appointment status: pending / confirmed

### 4.4 Consultation (Chat)

* Simple text-based chat
* One-to-one conversation between patient and doctor
* Messages stored in database

### 4.5 Notifications (Basic)

* Appointment confirmation feedback
* Simple in-app alerts

---

## 5. Non-Functional Requirements

* Simple and intuitive UI
* Fast response time
* Secure data handling
* Scalable architecture for future upgrades

---

## 6. Application Screens (10 Screens)

### 1️⃣ Splash Screen

* Application logo
* Simple animation

### 2️⃣ Onboarding Screens

* Short introduction to app features
* Skip button

### 3️⃣ Login Screen

* Email input
* Password input
* Login button
* Forgot password link

### 4️⃣ Register Screen

* Full Name
* Email
* Password
* Confirm Password
* Role selection (Patient / Doctor)

### 5️⃣ Home Screen

* Search bar
* List of doctors
* Filter by specialty

### 6️⃣ Doctor Profile Screen

* Doctor photo
* Name & specialty
* Description
* Availability
* Book Appointment button

### 7️⃣ Appointment Booking Screen

* Select date
* Select time
* Confirm appointment

### 8️⃣ My Appointments Screen

* List of booked appointments
* Appointment status

### 9️⃣ Chat Consultation Screen

* Text messages
* Real-time feel (basic)

### 🔟 Profile Screen

* User information
* Edit profile
* Logout

---

## 7. Data Models (Simplified)

### User

* id
* fullName
* email
* password
* role (Patient / Doctor)

### Doctor

* id
* userId
* specialty
* description
* availability

### Appointment

* id
* patientId
* doctorId
* date
* time
* status

### Message

* id
* senderId
* receiverId
* content
* timestamp

---

## 8. Suggested Technologies

### Frontend

* React Native / Expo
* TypeScript

### Backend

* Node.js
* Express.js

### Database

* MongoDB or PostgreSQL

### Authentication

* JSON Web Token (JWT)

---

## 9. Security Requirements

* Password encryption (bcrypt)
* JWT-based authentication
* Input validation
* Role-based authorization

---

## 10. Future Improvements (Out of Scope)

* Video consultations
* Online payment system
* Push notifications
* Advanced medical records
* Rating & reviews

---

## 11. Conclusion

This cahier de charges defines a simple yet functional version of the iDoctor application. It is suitable for academic projects, MVP development, or technical demonstrations. The architecture is designed to be scalable, allowing future enhancements without major restructuring.
