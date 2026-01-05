# CodeConnect 🚀
### *Tinder for Developers* 👩‍💻👨‍💻

**CodeConnect** is the ultimate platform for developers to connect, collaborate, and code together. Whether you're looking for a pair programming partner, a mentor, or a hackathon teammate, CodeConnect helps you find the perfect match! 🤝

---

## 📂 Project Structure

The project is divided into two main parts:

```
CodeConnect/
├── CodeConnect_Backend/   # Node.js & Express API ⚙️
│   ├── src/
│   │   ├── config/        # Database configuration
│   │   ├── models/        # Mongoose schemas (User, ConnectionRequest)
│   │   ├── routes/        # API Routes (auth, user, request, etc.)
│   │   ├── utils/         # Helpers (Socket.io, Validation)
│   │   └── app.js         # Main entry point
│   └── ...
│
└── CodeConnect_Fronted/   # React (Vite) Frontend 🎨
    ├── src/
    │   ├── components/    # Reusable UI components
    │   ├── lib/           # Utilities (axios, store)
    │   ├── App.jsx        # Main routing logic
    │   └── ...
    └── ...
```

---

## 🌟 Features

### 🔐 Authentication
*   **Secure Login/Signup**: standard email/password authentication using `bcrypt` and `JWT`.
*   **Google OAuth**: One-click login with Google for seamless access.

### 🧠 Smart Feed Service
*   **Intelligent Matching**: The feed algorithm filters out users you've already interacted with (ignored/interested/connected) and shows you fresh profiles.
*   **Safe Data**: Only public profile information is shared; sensitive data is protected.

### 🤝 Connections
*   **Send Requests**: Swipe right (Interested) or left (Ignore) on developer profiles.
*   **Review Requests**: Accept or reject incoming connection requests.
*   **My Connections**: View a list of all your accepted friends.

### 💬 Real-time Communication
*   **Instant Chat**: Built with **Socket.io** and **Stream Chat SDK** for smooth, real-time messaging.
*   **Video Calls**: Integrated **Stream Video SDK** for high-quality video calls directly within the app.

---

## 🛠️ Tech Stack

| Component | Technology | Description |
| :--- | :--- | :--- |
| **Frontend** | **React (Vite)** ⚛️ | Fast and modern UI library |
| | **TailwindCSS** 💅 | Utility-first CSS framework |
| | **Redux Toolkit** 🔄 | State management |
| | **Stream SDK** 📹 | Chat & Video infrastructure |
| **Backend** | **Node.js** 🚂 | JavaScript runtime |
| | **Express.js** ⚡ | Web framework |
| | **MongoDB** 🍃 | NoSQL Database |
| | **Socket.io** 🔌 | Real-time event-based communication |

---

## 🚀 Getting Started

Follow these steps to get CodeConnect running locally.

### Prerequisites
*   Node.js installed
*   MongoDB running locally or a cloud URI

### 1. Clone the Repository
```bash
git clone <repository-url>
cd CodeConnect
```

### 2. Backend Setup
1.  Navigate to the backend directory:
    ```bash
    cd CodeConnect_Backend
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  **Configure Environment**:
    Create a `.env` file in `CodeConnect_Backend/` (use `.env.example` as a reference):
    ```env
    PORT=7777
    MONGO_URI=your_mongodb_connection_string
    GOOGLE_CLIENT_ID=your_google_client_id
    GOOGLE_CLIENT_SECRET=your_google_client_secret
    ```
4.  Start the server:
    ```bash
    npm run dev
    ```

### 3. Frontend Setup
1.  Navigate to the frontend directory:
    ```bash
    cd ../CodeConnect_Fronted
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Start the React app:
    ```bash
    npm run dev
    ```

### 4. Enjoy! 🎉
Open your browser at `http://localhost:5173` (or the port shown in your terminal) and start connecting!

---

## 🔗 API Overview

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| **POST** | `/signup` | Register a new user |
| **POST** | `/login` | Authenticate user |
| **GET** | `/feed` | Get potential matches |
| **POST** | `/request/send/:status/:userId` | Send connection request |
| **POST** | `/request/review/:status/:requestId` | Review received request |

---

## 📄 License
This project is licensed under the ISC License. Assigment made with ❤️ by **Manorath**.
