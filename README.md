# 📘 Cahier de Charges – **iDoctor Mobile Application** (MVP)

---

## 1. General Presentation

**Application Name:** iDoctor
**Platform:** Mobile Application (Android & iOS)
**Application Type:** Medical appointment & consultation application
**Target Version:** MVP – Simple, Educational & Functional

### 🎯 Main Objective

The objective of the iDoctor application is to simplify interaction between patients and doctors by providing a mobile platform that allows users to search for doctors, view their profiles, and book medical appointments easily.

This version focuses on the essential features only, without advanced medical or financial functionalities.

---

## 2. Target Users

### 👤 Patient (User)

* Register and log in
* Search for doctors by specialty
* View doctor profiles
* Book medical appointments
* View appointment status

### 🧑‍⚕️ Doctor

* Register and log in
* Create and manage professional profile
* View appointment requests
* Confirm or manage appointments

---

## 3. Scope of the Application

This MVP version is intentionally kept simple and focuses on:

* Authentication & authorization
* Doctor listing and profiles
* Appointment booking system

❌ Excluded features in this phase:

* Online payments
* Video consultations
* Medical records
* Notifications
* Chat system

---

## 4. Functional Requirements

### 4.1 Authentication & Authorization

* User registration (Patient / Doctor)
* Login with email and password
* Password encryption using bcrypt
* Authentication using JWT
* Role-based access control (Patient / Doctor)

---

### 4.2 Doctor Management

* Doctors can create a professional profile
* Doctor profile includes:

  * Full name
  * Specialty
  * Description (bio)
  * Availability
* Doctors appear in the public doctor list

---

### 4.3 Appointment Management

* Patients can book appointments
* Doctors can view appointment requests
* Appointment status lifecycle:

  * Pending
  * Confirmed
  * Cancelled

---

## 5. Non-Functional Requirements

* Simple and intuitive user interface
* Fast response time
* Secure data handling
* Scalable architecture
* Clean code structure

---

## 6. Application Screens

### 1️⃣ Splash Screen

* Application logo
* Simple animation

### 2️⃣ Onboarding Screens

* Introduction to application features

### 3️⃣ Login Screen

* Email input
* Password input
* Login button

### 4️⃣ Register Screen

* Full name
* Email
* Password
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
* Book appointment button

### 7️⃣ Appointment Booking Screen

* Select date
* Select time
* Confirm appointment

### 8️⃣ My Appointments Screen

* List of appointments
* Appointment status

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
* fullName
* speciality
* bio
* imageUrl
* clinicName
* experience
* languages
* workTime
* availabilityDays
* consultationDuration
* phone
* address
* latitude
* longitude
* rating
* price
* certifications
* isAvailable

### Booking

* id
* patientId
* doctorId
* date
* time
* status

---

## 8. Suggested Technologies

### Frontend

* React Native
* Expo

### Backend

* Node.js
* Express.js

### Database

* PostgreSQL

### Authentication

* JSON Web Token (JWT)

---

## 9. Security Requirements

* Password hashing with bcrypt
* JWT-based authentication
* Input validation using Zod
* Role-based authorization
* Protected API routes

---

## 10. Dockerization (Containerization)

### 10.1 Objectives

* Simplify development setup
* Ensure environment consistency
* Isolate backend and database
* Prepare for deployment

### 10.2 Docker Architecture

#### 🐳 Backend Container

* Node.js + Express API
* Handles users, doctors, bookings

#### 🐘 Database Container

* PostgreSQL database
* Persistent storage using Docker volumes

---

### 10.3 Tools Used

* Docker
* Docker Compose

---

### 10.4 Services Overview

* **api**

  * Node.js backend service
  * Exposes REST API
  * Uses environment variables

* **db**

  * PostgreSQL official image
  * Persistent data volume

---

### 10.5 Environment Variables

* DB_NAME
* DB_USER
* DB_PASSWORD
* DB_HOST
* JWT_SECRET
* PORT

---

### 10.6 Docker Benefits

* Easy onboarding for developers
* Single command startup (`docker compose up`)
* No local dependency conflicts
* Scalable architecture

---

## 11. Future Improvements (Out of Scope)

* Online payments
* Notifications
* Chat system
* Video consultations
* Medical history management

---

## 12. Conclusion

This cahier de charges defines a complete and simple MVP version of the iDoctor mobile application. It is suitable for academic projects, technical demonstrations, and MVP validation. The architecture is clean, secure, and scalable, allowing future enhancements without major restructuring.
