# 📘 Cahier de Charges – **iDoctor Mobile Application** (Simple Version)

## 1. General Presentation

**Application Name:** iDoctor
**Platform:** Mobile Application (Android & iOS)
**Application Type:** Medical appointment & consultation app
**Target Version:** MVP – Simple & Educational

**Main Objective:**
The goal of the iDoctor application is to simplify the interaction between patients and doctors by providing an easy-to-use mobile platform for searching doctors, booking appointments.

---

## 2. Target Users

### 👤 Patient

* Search for doctors by specialty
* View doctor profiles
* Book medical appointments

### 🧑‍⚕️ Doctor

* Create professional profile
* View and confirm appointments

## 3. Scope of the Application

This version of iDoctor is intentionally kept simple and focuses only on the core features needed to demonstrate a functional healthcare booking system. Advanced features such as video calls, payments, and medical records are excluded from this phase.

---

## 4. Functional Requirements

### 4.1 Authentication & Authorization

* User registration (user / Doctor)
* User login with email and password
* Secure authentication using JWT
* Role-based access (user / Doctor)

### 4.2 Doctor Management

* Doctors can create a professional profile
* Profile includes specialty, description, and availability
* Doctors appear in the public doctor list

### 4.3 Appointment Management

* Patients can book appointments
* Doctors can view appointment requests
* Appointment status: pending / confirmed


---

## 5. Non-Functional Requirements

* Simple and intuitive UI
* Fast response time
* Secure data handling
* Scalable architecture for future upgrades

---


### 1️⃣ Splash Screen

* Application logo
* Simple animation

### 2️⃣ Onboarding Screens

* Short introduction to app features

### 3️⃣ Login Screen

* Email input
* Password input
* Login button

### 4️⃣ Register Screen

* Full Name
* Email
* Password
* Role selection (user/ Doctor)

### 5️⃣ Home Screen

* Search icon
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

## 7. Data Models (Simplified)

### User

* id
* fullName
* email
* password
* role (Patient / Doctor)

### Doctor
id
userId
fullName
speciality
bio
imageUrl
clinicName
experience
languages
workTime
availabilityDays
consultationDuration
phone
address
latitude
longitude
rating
price
certifications
isAvailable

### booking

* id
* patientId
* doctorId
* date
* time
* status

## 8. Suggested Technologies

### Frontend

* React Native / Expo

### Backend

* Node.js
* Express.js

### Database

*  PostgreSQL

### Authentication

* JSON Web Token (JWT)

---

## 9. Security Requirements

* Password encryption (bcrypt)
* JWT-based authentication
* Input validation zod
* Role-based authorization

---



## 11. Conclusion

This cahier de charges defines a simple yet functional version of the iDoctor application. It is suitable for academic projects, MVP development, or technical demonstrations. The architecture is designed to be scalable, allowing future enhancements without major restructuring.
