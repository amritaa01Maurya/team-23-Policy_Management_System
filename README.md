Policy Management System

A full-stack MERN-based solution digitizing the entire lifecycle of an insurance policy.
 1. Problem Statement
The traditional insurance industry relies heavily on paperwork, manual verification, and outdated systems. Customers face long wait times, unclear policy information, and a slow claims process. Insurers encounter operational inefficiencies, high verification overhead, and limited transparency.=
Goal:
Build a modern Policy Management System that automates the end-to-end workflow—policy purchase, premium calculation, payments, policy generation, and claim processing—while maintaining transparency and reducing manual intervention.
2. Tech Stack
Frontend
React.js
Axios
React Router

Backend
->Node.js
->Express.js
->MongoDB + Mongoose
->JWT Authentication
->seed.js
->server.js
->createAdmin.js

Other Tools
->PDFKit (auto-generate policy PDF)
->Multer (evidence upload)
->Dotenv
->Nodemon
->ERD Tool (for schema diagram)

3. Project Setup Steps
4. Backend Setup
cd backend
npm install
Create a .env file (refer .env.example):

PORT=5000
MONGO_URI=your_mongo_url
JWT_SECRET=your_secret


Start server:
npm run dev

Frontend Setup
cd frontend
npm install

Start frontend:
npm run dev

4. Folder Structure
team-23-Policy_Management_System
│── backend
│   ├── models
│   │   ├── User.js
│   │   ├── Policy.js
│   │   ├── Product.js
│   │   ├── Claim.js
│   │   └── AuditLog.js
│   ├── routes
│   │   ├── authRoutes.js
│   │   ├── policyRoutes.js
│   │   ├── claimRoutes.js
│   │   ├── productRoutes.js
│   │   └── premiumRoutes.js
│   ├── controllers
│   ├── middleware
│   ├── utils
│   ├── server.js
│   ├── seed.js
│   └── createAdmin.js
│
│── frontend
│   ├── src
│   │   ├── pages
│   │   ├── components
│   │   ├── hooks
│   │   └── services
│   ├── public
│   └── package.json
│
│── README.md
│── .env.example


6. API Documentation
Auth Routes
Method	Endpoint	Description
POST	/api/auth/register	Create user
POST	/api/auth/login	Login + JWT
Policy Routes
Method	Endpoint	Description
POST	/api/policies/create	Create policy
GET	/api/policies/my	Get user policies
GET	/api/policies/:id/pdf	Download PDF
Premium Routes
Method	Endpoint	Description
POST	/api/premium/calc	Calculate premium
Claim Routes
Method	Endpoint	Description
POST	/api/claim/:policyId	File claim
GET	/api/claim/user	User claim list
PUT	/api/claim/verify/:claimId	Admin verify claim
PUT	/api/claim/approve/:claimId	Admin approve claim
 7. Hackathon Deliverables
 Working Prototype Demonstrates
1. Purchase Flow
Calculate Premium → Make Payment → Auto-generate PDF Policy

2. Customer Dashboard
View Purchased Policies → Click "File Claim"

3. Admin Workflow
View Claims → Verify Evidence → Approve/Reject

 8. Database Schema (ER Diagram)
User 1---N Policy
User 1---N Claim
Policy 1---1 Product
Claim N---1 Policy
AuditLog (tracks changes)

Tables Overview

Users → name, email, password, role
Products → insurance categories
Policies → link user ↔ product
Claims → file uploads, status, admin notes
Audit Logs → history tracking

 9. Premium Logic

The premium calculator uses parameters such as:\
Product risk score
Coverage amount
User attributes (age, category, etc.)
Duration
Static base premium

General Formula:
Premium = BaseRate × CoverageMultiplier × RiskFactor × Duration

Backend file reference:
backend/routes/premiumRoutes.js

10. .env.example
->PORT=5000
->MONGO_URI=your_mongo_url
->JWT_SECRET=your_jwt_secret
->ADMIN_EMAIL=admin@example.com
->ADMIN_PASSWORD=Admin@123
