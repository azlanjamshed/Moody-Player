# 🎵 Moody Player

**Moody Player** is an intelligent full-stack music application that detects a user's facial expression and suggests songs accordingly. It leverages emotion detection through the webcam to create a personalized and mood-based music experience.

---

## 🧠 Features

- 🎥 Facial expression detection via webcam
- 🤖 Real-time mood analysis
- 🎶 Auto song suggestions based on mood
- 🔄 Full-stack application with React (frontend) and Express.js + MongoDB (backend)
- 📡 API calls handled via Axios

---

## ⚙️ Tech Stack

### Frontend
- React.js
- Axios
- Face-api.js (for facial expression recognition)
- Tailwind CSS (optional for styling)

### Backend
- Node.js
- Express.js
- MongoDB (Mongoose)

---

## 🧪 How It Works

1. The user allows webcam access.
2. Facial expression is analyzed using `face-api.js`.
3. Based on the detected emotion (e.g., happy, sad, angry), the frontend sends the emotion to the backend.
4. The backend queries the MongoDB database for songs tagged with the matching emotion.
5. Suggested songs are returned and displayed to the user.

---

## 🚀 Getting Started

### Prerequisites

- Node.js & npm
- MongoDB (local or Atlas)

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/azlanjamshed/Moody-Player
   cd moody-player

