# 🚀 DevBlog - Full-Stack Blog Application

A modern, responsive, and secure full-stack web application built using **Node.js, Express.js, Vanilla JavaScript, HTML5, and CSS3**. Hosted live on **Render** (Backend) and **Vercel** (Frontend).

---

## 🌐 Live Application Links

- **Frontend Application (Vercel):** https://blog-application-saad-8v1fa37xg-frontend-ai-capstone.vercel.app/
- **Backend REST API (Render):** https://blog-application-2mgp.onrender.com/

---

## 🌟 Key Features

- **🔐 User Authentication:** Secure registration and login flows using `bcryptjs` for password hashing and `JSON Web Tokens (JWT)` for session management.
- **📝 Full CRUD Operations:** Create, Read, Update, and Delete blog posts seamlessly through dynamic API calls.
- **🛡️ Protected Dashboard:** Restricted routes ensuring users can only manage their own authored blog posts.
- **📰 Dynamic Single Article View:** Fetch and render full article details dynamically using URL parameters (`blog-detail.html?id=...`).
- **🔍 Client-side Search & Filtering:** Real-time search and category filtering directly on the home page.
- **📱 Fully Responsive UI:** Mobile-first layout designed with modern CSS components and intuitive layout structures.

---

## 🛠️ Tech Stack

### Frontend
- **HTML5 & CSS3:** Semantic layout structuring and responsive styles.
- **Vanilla JavaScript (ES6+):** Dynamic DOM manipulation, fetch API requests, and localStorage state persistence.

### Backend
- **Node.js & Express.js:** Scalable server architecture and RESTful routing.
- **Authentication & Security:** `bcryptjs` hashing, `jsonwebtoken` (JWT), and `cors` configuration.
- **Database:** NeDB / In-Memory Persistent Datastore.

---

## 📁 Project Structure

blog-application/
├── backend/
│   ├── config/          # Database setup configuration
│   ├── middleware/      # JWT Authentication token verification
│   ├── models/          # User & Blog database schemas
│   ├── routes/          # REST API endpoints (auth.js, blog.js)
│   ├── server.js        # Main Express server entry point
│   └── package.json
├── css/
│   └── style.css        # Application styling
├── js/
│   └── script.js       # Frontend API connectivity & UI logic
├── index.html           # Home page with blog feed & search
├── blog-detail.html     # Single blog view page
├── dashboard.html       # Protected user dashboard
├── create-blog.html     # Blog post creation form
├── login.html           # User login interface
├── register.html        # User registration interface
├── vercel.json          # Deployment routing configuration
└── README.md            # Documentation