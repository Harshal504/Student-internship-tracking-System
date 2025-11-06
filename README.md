Student Internship Tracking System - README
# 🎓 Student Internship Tracking System

A full-stack web platform built to streamline internship management for students, companies, and supervisors.  
The system enables students to register, apply for internships, and manage applications; companies to post and review internships; and supervisors to monitor assigned students and company data.

---

## 🚀 Tech Stack

| Layer | Technology |
|-------|-------------|
| **Frontend** | React, React Bootstrap |
| **Backend** | Node.js, Express.js |
| **Database** | MySQL |
| **Authentication** | JWT (JSON Web Token) |
| **Language** | JavaScript (ES6+) |

---

## 📁 Folder Structure

```bash
Student-internship-tracking-System/
│
├── frontend/              # React app (Vite or CRA)
│   ├── src/
│   ├── package.json
│   └── ...
│
├── backend/               # Node.js + Express API
│   ├── index.js
│   ├── routes/
│   ├── controllers/
│   ├── models/
│   └── ...
│
└── README.md
```
GitHub Repository: https://github.com/Harshal504/Student-internship-tracking-System

---
## ⚙️ Setup Instructions

```bash
Frontend Setup:
cd frontend
npm i
npm run dev

Backend Setup:
cd backend
npm i
node index.js

Node Version: 22
```
---

🔑 Core Features

👨‍🎓 Student
- Register and log in using JWT authentication
- View available internships
- Apply for internships
- Track and manage submitted applications

🏢 Company
- Register and log in
- Post new internships and manage listings
- View and update internship application statuses

🧑‍🏫 Supervisor
- Access dashboard showing all companies
- View students assigned under their supervision
- Edit or delete student details
- Dashboard displays meta details of the logged-in user

🛡️ Authentication & Authorization
- JWT-based authentication for all user roles
- Role-based authorization for protected routes

---

👨‍💻 Developers

🧩 Harshal
- Implemented Student APIs and components for managing student data
- Created Application-related APIs and display components
- Developed Sign-in and Sign-up components and APIs
- Integrated JWT tokenization and authorization

🧩 Vaishakh
- Worked on Company-related modules
- Developed APIs and components for fetching and displaying company and internship data
- Created internship application and listing APIs/components
- Designed the About Us page

🧩 Rachana
- Developed Supervisor APIs (GET, POST, DELETE)
- Built components to list and manage supervisors
- Designed the dashboard displaying logged-in user details



---

🧭 Future Enhancements
- Email notifications for application status changes
- Enhanced analytics dashboard for supervisors and companies
- Internship completion reports and feedback system

---

🪪 License
This project is open-source and available under the MIT License.

---

💫 Developed with collaboration and dedication by:
Harshal, Rachana, and Vaishak


