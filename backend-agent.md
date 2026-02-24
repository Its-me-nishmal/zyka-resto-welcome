# Backend Agent Instructions
ZYKA QR Campaign System

---

## Mission

Design and implement a scalable, secure backend system using:

- Node.js
- Express
- TypeScript
- MongoDB (primary)
- File System JSON (fallback)

---

## Responsibilities

- Setup Express server with TypeScript
- Configure environment variables
- Connect MongoDB when MONGO_URI exists
- Fallback to file storage when MongoDB missing
- Build REST APIs
- Validate & sanitize inputs
- Provide admin exports

---

## Architecture Rules

- Controller → Service → Model pattern
- No business logic inside routes
- Services must be database-agnostic

---

## Environment Variables


PORT=5000
MONGO_URI=
DATA_FILE_PATH=./data/submissions.json
ADMIN_USER=
ADMIN_PASS=


---

## Core APIs

### Public

POST /api/submit  
GET /api/rewards  

### Admin

GET /api/admin/submissions  
GET /api/admin/export/excel  
GET /api/admin/export/pdf  

---

## Data Model


Submission {
name: string
mobile: string
place: string
favoriteFood: string
visitTime: string
companionType: string
reward: string
deviceId: string
createdAt: Date
}


---

## Database Strategy

If MONGO_URI exists  
→ Connect MongoDB  

Else  
→ Use JSON file storage  

Both must use same service interface.

---

## File Storage Format


data/
└── submissions.json


---

## Export Rules

- Excel via xlsx
- PDF via pdfkit
- Columns must match Data Model

---

## Security

- Rate limiting
- Helmet
- CORS whitelist
- Admin authentication middleware

---

## Coding Standards

- TypeScript strict
- ESLint
- Prettier
- Async/Await only

---

## Deliverables

- Working server
- API documentation
- Setup guide
- Sample .env
