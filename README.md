# Market Place

A full-stack bike marketplace where:
- **Buyers** can browse bikes, filter/search listings, and submit interest leads.
- **Sellers** can sign up, log in, upload bikes with photos, manage listings, and view dashboard data.

The project is split into:
- `frontend/` → React + Vite client
- `backend/` → Node.js + Express + MongoDB API

---

## Tech Stack

### Frontend
- React 19
- React Router
- Vite
- Tailwind CSS + DaisyUI
- Axios

### Backend
- Node.js (ESM)
- Express 5
- MongoDB + Mongoose
- JWT authentication
- Multer (file uploads)
- Cloudinary (image hosting)
- SendGrid/Nodemailer (lead email notifications)

---

## Project Structure

```text
Market_Place/
├── backend/
│   ├── controllers/
│   ├── db/
│   ├── middlewares/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   └── index.js
├── frontend/
│   ├── pages/
│   ├── components/
│   ├── src/
│   └── utils/
└── README.md
```

---

## Features

### Buyer
- Browse all bikes
- Search by brand/bike name/model
- Filter by condition (`GOOD`, `EXCELLENT`, `SUPERB`)
- Filter by CC range and sort by newest/CC
- Submit lead form for a selected bike

### Seller
- Register with profile + address
- Login/logout
- Protected seller routes
- Upload bikes with multiple photos
- View listed bikes
- Delete own bike listings
- Seller dashboard stats and profile details

### Lead Management
- Stores lead details in MongoDB
- Sends notification email on lead creation
- Sends acknowledgement email to buyer (if email provided)

---

## API Overview

Base URL: `http://localhost:<PORT>/api/v1`

### Seller Routes (`/seller`)
- `POST /register` — register seller
- `POST /login` — seller login
- `POST /logout` — logout (auth required)
- `POST /refreshaccesstoken` — refresh access token
- `POST /changepassword` — change password
- `GET /current` — current seller profile (auth required)
- `POST /bikeupload` — upload bike + photos (auth required)
- `DELETE /deletebike/:id` — delete bike by id (auth required)

### Bike Routes (`/bikes`)
- `GET /allbikes` — list/search/filter bikes
- `POST /lead` — create lead for interested buyer

---

## Environment Variables

Create `backend/.env`:

```env
PORT=8000
MONGODB_URI=mongodb://127.0.0.1:27017/
CORS_ORIGIN=http://localhost:5173

ACCESS_TOKEN_SECRET=your_access_token_secret
ACCESS_TOKEN_EXPIRY=1d
REFRESH_TOKEN_SECRET=your_refresh_token_secret
REFRESH_TOKEN_EXPIRY=10d

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

SENDGRID_API_KEY=your_sendgrid_api_key
EMAIL_USER=your_sender_email
EMAIL_PASS=your_email_password_or_app_password
```

Create `frontend/.env`:

```env
VITE_API_BASE_URL=http://localhost:8000/api/v1
```

---

## Local Setup

### 1) Clone and install

```bash
git clone <repo-url>
cd Market_Place

cd backend && npm install
cd ../frontend && npm install
```

### 2) Run backend

```bash
cd backend
npm start
```

### 3) Run frontend

```bash
cd frontend
npm run dev
```

Frontend default: `http://localhost:5173`

---

## Available Scripts

### Backend (`backend/package.json`)
- `npm start` — start backend with nodemon

### Frontend (`frontend/package.json`)
- `npm run dev` — start Vite dev server
- `npm run build` — production build
- `npm run lint` — run ESLint
- `npm run preview` — preview production build

---

## Notes

- Uploaded bike photos are temporarily stored in `backend/public/temp` before Cloudinary upload.
- API database name is derived from constants (`MONGODB_URI + mp`).
- Auth token is sent via `Authorization: Bearer <token>` and also supports cookie-based flow.

