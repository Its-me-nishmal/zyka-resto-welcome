# ZYKA Resto Café – Pre-Launch Interactive QR Campaign
Product Requirements Document (PRD)

---

## 1. Overview

ZYKA Resto Café is launching an interactive QR-based customer engagement system to collect customer leads before store opening. Users scan a QR code, complete a short interactive experience, and submit their details to receive a reward. Data is stored securely and accessible via an Admin Panel.

---

## 2. Goals

- Collect customer Name, Mobile Number, and Place
- Create engaging, game-like experience
- Limit submissions to 3 per device
- Store data in MongoDB (preferred)
- Fallback to File System storage if MongoDB unavailable
- Admin panel to view, filter, and export data

---

## 3. Target Users

- Walk-in customers
- Passersby scanning QR posters
- Store marketing team (admin)

---

## 4. User Flow

1. Scan QR Code  
2. Landing Page → Start Experience  
3. Micro Game / Spin / Scratch  
4. Answer 2–3 Questions  
5. Enter Name, Mobile, Place  
6. Submit  
7. Receive Reward Message  

---

## 5. Functional Requirements

### 5.1 Frontend (React)

- Responsive mobile-first UI
- Landing Screen
- Game Screen
- Question Screen
- Lead Form Screen
- Success Screen
- LocalStorage submission counter (max 3)

### 5.2 Backend (Express + TypeScript)

- REST API for submissions
- MongoDB connection
- File system fallback (JSON file)
- Admin authentication
- Data export APIs

### 5.3 Admin Panel

- Login screen
- Dashboard metrics
- View submissions
- Search & filter
- Export to Excel
- Export to PDF

---

## 6. Data Fields

- name
- mobile
- place
- favoriteFood
- visitTime
- companionType
- reward
- deviceId
- createdAt

---

## 7. Non-Functional Requirements

- Fast load time
- Mobile optimized
- Secure input validation
- Scalable architecture
- Environment-based configuration

---

## 8. Tech Stack

Frontend:
- React + Vite
- Tailwind CSS

Backend:
- Node.js
- Express
- TypeScript

Database:
- MongoDB
- File System fallback (JSON)

---

## 9. Environment Variables


PORT=5000
MONGO_URI=
ADMIN_USER=
ADMIN_PASS=
DATA_FILE_PATH=./data/submissions.json


---

## 10. Success Metrics

- Number of scans
- Submission count
- Conversion rate
- Opening day redemptions

---

## 11. Out of Scope

- Payment processing
- User login system
- SMS sending

---
