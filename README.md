Here is a professional and comprehensive **`README.md`** file for your **BookCourier / LightHouse** project. You can copy and paste this directly into your GitHub repository's root directory.

````markdown
# 📚 BookCourier (LightHouse) – Library-to-Home Delivery System

![Project Banner](https://images.unsplash.com/photo-1481627834876-b7833e8f5570?q=80&w=1000&auto=format&fit=crop)

**Live Website:** [https://lighthouselibrary.vercel.app](https://lighthouselibrary.vercel.app)  
**Server API:** [https://book-courier-server.vercel.app](https://lighthouse-server-three.vercel.app/)
## 📖 Project Overview

**BookCourier** is a sophisticated full-stack library management and delivery system. It bridges the gap between traditional libraries and modern convenience, allowing users to borrow or purchase books online and have them delivered to their doorstep.

The platform features a multi-role system (**User, Librarian, Admin**), real-time order tracking, secure payments via Stripe, and a modern, responsive user interface with dark mode support.

---

## ✨ Key Features

### 🎨 UI/UX & Design

- **Fully Responsive:** Optimized for Mobile, Tablet, and Desktop.
- **Modern Aesthetics:** Glassmorphism, Gradient buttons, and clean typography.
- **Animations:** Smooth page transitions and element animations using **Framer Motion**.
- **Dark/Light Mode:** System-aware theme toggle.
- **Interactive Maps:** Real-time coverage map using **Leaflet**.

### 👤 User Functionality

- **Authentication:** Secure Email/Password & Google Login (Firebase).
- **Book Browsing:** Advanced search, sorting, and category filtering.
- **Borrowing/Buying:** Seamless checkout process with **Stripe** payment integration.
- **Dashboard:**
  - **My Orders:** Track order status (Pending, Shipped, Delivered) and Payment history.
  - **Wishlist:** Save books for later.
  - **Reviews:** Rate and review books dynamically.

### 📚 Librarian Dashboard

- **Add Books:** Upload book details with categories, quantity, and pricing.
- **My Books:** Manage (Update/Edit) own book collection.
- **Manage Orders:** Process customer orders (Update status from Pending → Shipped → Delivered).

### 🛡️ Admin Dashboard

- **User Management:** Promote users to Librarians or Admins.
- **System-Wide Control:** Edit or delete any book or order in the system.
- **Overview:** Access to all system data.

---

## 🛠️ Technology Stack

### Client Side (Frontend)

- **Framework:** React.js (Vite)
- **Styling:** Tailwind CSS
- **Animations:** Framer Motion
- **State Management:** TanStack Query (React Query)
- **Routing:** React Router DOM
- **Maps:** React Leaflet
- **Forms:** React Hook Form
- **Notifications:** React Hot Toast / SweetAlert2

### Server Side (Backend)

- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB (Native Driver)
- **Authentication:** JWT (JSON Web Tokens)
- **Payment:** Stripe API

---

## 📦 NPM Packages Used

| Package                     | Purpose                           |
| :-------------------------- | :-------------------------------- |
| **axios**                   | HTTP Requests (with Interceptors) |
| **firebase**                | Authentication                    |
| **@stripe/react-stripe-js** | Payment Gateway Integration       |
| **lucide-react**            | Modern Icons                      |
| **localforage**             | Offline storage utility           |
| **match-sorter**            | Sorting utility                   |
| **sort-by**                 | Sorting utility                   |
| **dotenv**                  | Environment Variables             |
| **cors**                    | Cross-Origin Resource Sharing     |
| **cookie-parser**           | Parsing Cookies                   |

---

## 💳 Payment Demo Credentials

Use these credentials to test the Stripe payment integration in the "Pay Now" section of the User Dashboard.

| Field           | Value                     |
| :-------------- | :------------------------ |
| **Card Number** | `4242 4242 4242 4242`     |
| **Expiry Date** | `12/34` (Any future date) |
| **CVC**         | `567` (Any 3 digits)      |
| **Postal Code** | `12345`                   |

---

## 🚀 How to Run Locally

### 1. Clone the Repository

```bash
git clone [https://github.com/your-username/book-courier-client.git](https://github.com/your-username/book-courier-client.git)
cd book-courier-client
```

### 2\. Setup Client

```bash
npm install
```

Create a `.env.local` file in the root and add your keys:

```env
VITE_apiKey=YOUR_FIREBASE_API_KEY
VITE_authDomain=YOUR_FIREBASE_AUTH_DOMAIN
VITE_projectId=YOUR_FIREBASE_PROJECT_ID
VITE_storageBucket=YOUR_FIREBASE_STORAGE_BUCKET
VITE_messagingSenderId=YOUR_FIREBASE_SENDER_ID
VITE_appId=YOUR_FIREBASE_APP_ID
VITE_Payment_Gateway_PK=YOUR_STRIPE_PUBLISHABLE_KEY
VITE_API_URL=http://localhost:5000
```

Run the client:

```bash
npm run dev
```

### 3\. Setup Server

Navigate to the server folder:

```bash
cd ../book-courier-server
npm install
```

Create a `.env` file in the server root:

```env
DB_USER=YOUR_MONGODB_USERNAME
DB_PASS=YOUR_MONGODB_PASSWORD
ACCESS_TOKEN_SECRET=YOUR_RANDOM_SECRET_STRING
STRIPE_SECRET_KEY=YOUR_STRIPE_SECRET_KEY
PORT=5000
```

Run the server:

```bash
npm start
```

---

## 🔐 Admin Access

To test Admin features locally:

1.  Register a new user on the client side.
2.  Go to your **MongoDB Database**.
3.  Find the user in the `users` collection.
4.  Manually update the `role` field from `"user"` to `"admin"`.
5.  Re-login to the application.

---

## 📄 License

This project is open-source and available under the [MIT License](https://www.google.com/search?q=LICENSE).

```
