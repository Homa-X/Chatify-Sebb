# 💬 Chatify

![React](https://img.shields.io/badge/React-20232a?style=for-the-badge&logo=react&logoColor=61dafb)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

Chatify is a modern, real-time chat application built with **React** and **Vite**, featuring secure authentication and a sleek user interface. This project was developed as part of a school assignment, demonstrating proficiency in frontend development and API integration.

---

## ✨ Features

- **🔐 Secure Authentication**: Full Login and Registration system using JWT.
- **🛡️ Enhanced Security**: Implemented CSRF protection (Double Submit Cookie pattern) to prevent cross-site attacks.
- **💬 Real-time Messaging**: Send and receive messages instantly in different conversation channels (General, Random).
- **🎨 Modern UI**: Clean and responsive design using CSS modules and modern layout techniques.
- **⚡ Fast Performance**: Powered by Vite for lightning-fast development and production builds.
- **🗑️ Message Management**: Users can delete their own messages.

---

## 🛠️ Tech Stack

- **Frontend**: React.js
- **Build Tool**: Vite
- **HTTP Client**: Axios (with interceptors for Token & CSRF handling)
- **Security**: DOMPurify (XSS protection), JWT-decode
- **Routing**: React Router DOM

---

## 🚀 Getting Started

Follow these steps to set up the project locally.

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1.  **Clone the repository**
    ```bash
    git clone https://github.com/Homa-X/Chatify-Sebb.git
    cd Chatify
    ```

2.  **Install dependencies**
    ```bash
    npm install
    ```

3.  **Start the development server**
    ```bash
    npm run dev
    ```

4.  **Open in your browser**
    Visit `http://localhost:5173` to see the app in action!

---

## 🔒 Security Implementation (Teacher Note)

This project has been patched to correctly handle **CSRF Tokens**.
- The `csrfToken` is fetched from the API upon application load.
- It is passed down to sensitive forms (`Login`, `Register`).
- The token is submitted within the **request body** to satisfy the backend's double-check requirement, resolving previous `403 Forbidden` errors.

---

## 👤 Author

**Homayoun Khanmohammadi**
- GitHub: [@Homa-X](https://github.com/Homa-X)

---

> Built with ❤️ for the React Chat Assignment
