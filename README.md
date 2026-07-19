# 📚 Fable - Ebook Sharing Platform(Client)

Fable is a modern MERN-based Ebook Sharing Platform where readers can discover, purchase, and read ebooks, while writers can publish and manage their own ebooks. The platform includes secure authentication, Stripe payment integration, role-based dashboards, and analytics.

---

## 🌐 Live Website

https://ebook-store-steel.vercel.app/

**API Server:** https://ebook-server-svee.onrender.com

---

## 🔑 Admin Credentials

Email:
admin@fable.com

Password:
Admin@123

---

## 🚀 Features

### Authentication
- Email & Password Login
- Google Login (Better Auth)
- JWT Authentication
- Role Based Access Control (Reader / Writer / Admin)
- Protected Routes

### Reader Features
- Browse Ebooks
- Search, Filter & Sort
- Ebook Details Page
- Stripe Checkout
- Purchased Library
- Purchase History
- Read Purchased Books
- Bookmark System
- Reader Dashboard
- Reader Profile

### Writer Features
- Add Ebook
- Edit Ebook
- Delete Ebook
- Publish / Unpublish Ebook
- Manage All Own Ebooks
- Sales History
- Writer Dashboard Analytics
- Verification Status
- Writer Profile

### Admin Features
- Dashboard Analytics
- Manage Users
- Change User Roles
- Block / Unblock Users
- Manage All Ebooks
- Publish / Unpublish Ebooks
- Delete Ebooks
- View All Transactions
- Charts (Monthly Sales, Genre Distribution)

### Other Features
- Fully Responsive Design
- Framer Motion Animations
- Loading Skeletons
- Empty States
- Toast Notifications
- Global Loading Page
- Custom 404 Page
- Error Boundary
- Pagination
- Dark Mode Support

---

## 🛠️ Technologies Used

### Frontend

- Next.js 16
- React 19
- Tailwind CSS v4
- DaisyUI
- TanStack Query
- Framer Motion
- Axios
- React Hook Form + Zod
- Better Auth
- Lucide React
- React Icons
- Recharts
- Sonner

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT (jsonwebtoken)
- bcrypt
- Better Auth
- Stripe
- imgBB (image hosting)

---

## 📦 NPM Packages

### Client

- next
- react
- react-dom
- @tanstack/react-query
- axios
- better-auth
- framer-motion
- lucide-react
- react-icons
- react-hook-form
- @hookform/resolvers
- zod
- recharts
- sonner
- react-hot-toast
- js-cookie
- jwt-decode
- tailwindcss
- daisyui
- clsx
- tailwind-merge

### Server

- express
- mongoose
- mongodb
- jsonwebtoken
- bcrypt
- better-auth
- stripe
- cors
- cookie-parser
- dotenv
- zod
- nodemon (dev)

---

## ⚙️ Installation

### Clone Repository

```bash
git clone <client_repo_url>
```

```bash
git clone <server_repo_url>
```

---

### Install Dependencies

Client

```bash
npm install
```

Server

```bash
npm install
```

---

### Environment Variables

Frontend (`.env.local`)

```env
NEXT_PUBLIC_API_URL=http://localhost:5000

NEXT_PUBLIC_SERVER_URL=http://localhost:5000

NEXT_PUBLIC_BETTER_AUTH_URL=http://localhost:5000

NEXT_PUBLIC_APP_URL=http://localhost:3000

NEXT_PUBLIC_IMGBB_API_KEY=your_imgbb_api_key
```

Backend (`.env`)

```env
PORT=5000

NODE_ENV=development

DATABASE_URL=your_mongodb_connection_string

JWT_ACCESS_SECRET=your_jwt_access_secret

JWT_ACCESS_EXPIRES=7d

JWT_SECRET=your_jwt_secret

CLIENT_URL=http://localhost:3000

STRIPE_SECRET_KEY=your_stripe_secret_key

STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret

BETTER_AUTH_SECRET=your_better_auth_secret

BETTER_AUTH_URL=http://localhost:5000

GOOGLE_CLIENT_ID=your_google_client_id

GOOGLE_CLIENT_SECRET=your_google_client_secret
```

---

### Run Project

Client

```bash
npm run dev
```

Server

```bash
npm run dev
```

Client runs on `http://localhost:3000`
Server runs on `http://localhost:5000`

---

## 📂 Project Structure
Client
│
├── src
│   ├── app
│   │   ├── (auth)
│   │   ├── (main)
│   │   ├── dashboard
│   │   ├── payment
│   │   └── read
│   ├── components
│   │   ├── auth
│   │   ├── browse
│   │   ├── dashboard
│   │   ├── ebook
│   │   ├── home
│   │   ├── layout
│   │   ├── ui
│   │   └── writer
│   ├── config
│   ├── context
│   ├── hooks
│   ├── lib
│   ├── providers
│   └── services
Server
│
├── src
│   ├── app
│   │   ├── config
│   │   ├── lib
│   │   ├── middleware
│   │   ├── modules
│   │   │   ├── admin
│   │   │   ├── bookmark
│   │   │   ├── ebook
│   │   │   ├── purchase
│   │   │   ├── reading-progress
│   │   │   ├── user
│   │   │   └── writer
│   │   ├── routes
│   │   └── utils
│   ├── app.js
│   └── server.js

---

## 🔌 API Endpoints

### Users
- `POST /api/v1/users/register`
- `POST /api/v1/users/login`
- `POST /api/v1/users/google-sync`
- `GET /api/v1/users/me`
- `GET /api/v1/users/dashboard`
- `GET /api/v1/users` (admin)
- `PATCH /api/v1/users/:id/block` (admin)
- `PATCH /api/v1/users/:id/unblock` (admin)
- `PATCH /api/v1/users/:id/role` (admin)

### Ebooks
- `GET /api/v1/ebooks`
- `GET /api/v1/ebooks/:id`
- `POST /api/v1/ebooks` (writer/admin)
- `PATCH /api/v1/ebooks/:id` (writer/admin)
- `DELETE /api/v1/ebooks/:id` (writer/admin)

### Purchases
- `POST /api/v1/purchases/checkout`
- `POST /api/v1/purchases/webhook`
- `GET /api/v1/purchases/my`
- `GET /api/v1/purchases/read/:ebookId`
- `GET /api/v1/purchases/writer/sales-history` (writer)
- `GET /api/v1/purchases/top-writers`
- `GET /api/v1/purchases` (admin)

### Bookmarks
- `POST /api/v1/bookmarks`
- `GET /api/v1/bookmarks`

### Writer
- `GET /api/v1/writer/dashboard` (writer)
- `GET /api/v1/writer/top-writers`

### Admin
- `GET /api/v1/admin/stats` (admin)
- `GET /api/v1/admin/monthly-sales` (admin)
- `GET /api/v1/admin/ebooks-by-genre` (admin)

---

## 💳 Testing Payments

Use Stripe test card details:

Card Number: 4242 4242 4242 4242
Expiry: Any future date
CVC: Any 3 digits
ZIP: Any 5 digits
---

## 👨‍💻 Developed By

**MD Rabbi Miah**

Department of Computer Science & Engineering

Comilla University
