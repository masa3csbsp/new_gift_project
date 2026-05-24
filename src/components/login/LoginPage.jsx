import { useState } from "react";
import { motion } from "framer-motion";
import "./Login.css";
import FloatingHearts from "./FloatingHearts";

import { db } from "../../firebase";
import { ref, push } from "firebase/database";

export default function LoginPage({ onSuccess }) {
  const [mode, setMode] = useState("login");

  const [answer, setAnswer] = useState("");
  const [error, setError] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  const [successMsg, setSuccessMsg] = useState("");

  const correctAnswer = "May29";

  // 🔐 LOGIN
  const handleSubmit = () => {
    if (answer.toLowerCase() === correctAnswer.toLowerCase()) {
      onSuccess();
    } else {
      setError("Oops! That’s not the right key 💭");
    }
  };

  // 💌 SAVE WISH TO FIREBASE
  const saveWish = async () => {
    if (!name.trim() || !message.trim()) {
      setSuccessMsg("Please fill both fields 💭");
      return;
    }

    try {
      await push(ref(db, "wishes"), {
        name,
        message,
        createdAt: Date.now(),
      });

      setName("");
      setMessage("");

      setSuccessMsg("Your wish has been added 💖");

      setTimeout(() => setSuccessMsg(""), 2000);

    } catch (error) {
      console.error(error);
      setSuccessMsg("Something went wrong ❌");
    }
  };

  return (
    <div className="login-container">
      <FloatingHearts />

      {/* 🎥 VIDEO */}
      <video className="bg-video" autoPlay loop muted playsInline>
        <source src="/videos/login-bg.mp4" type="video/mp4" />
      </video>

      <motion.div
        className="login-box"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
      >

        {/* 🔥 TOGGLE */}
        <div className="tabs">

          <button
            className={mode === "login" ? "active" : ""}
            onClick={() => setMode("login")}
          >
            Unlock 💖
          </button>

          <button
            className={mode === "wish" ? "active" : ""}
            onClick={() => setMode("wish")}
          >
            Wishes 💌
          </button>

        </div>

        {/* 🔐 LOGIN MODE */}
        {mode === "login" && (
          <>
            <h2>Dear Malini Akka & Arun Kumar Mama 💖</h2>

            <p className="subtitle">
              A little surprise is waiting for you...
            </p>

            <p className="question">
              "What is special?"
            </p>

            {/* 🔒 PASSWORD INPUT */}
            <div className="password-box">

              <input
                type={showPassword ? "text" : "password"}
                placeholder="Type your answer..."
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
              />

              

            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleSubmit}
            >
              Unlock Your Story ✨
            </motion.button>

            {error && <p className="error">{error}</p>}
          </>
        )}

        {/* 💌 WISH MODE */}
        {mode === "wish" && (
          <>
            <h3>Send Your Wishes 💖</h3>

            <input
              type="text"
              placeholder="Your Name / Relation"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <textarea
              placeholder="Write your wishes..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.9 }}
              onClick={saveWish}
            >
              Send Wish 💖
            </motion.button>

            {successMsg && (
              <p className="success">{successMsg}</p>
            )}
          </>
        )}
      </motion.div>
    </div>
  );
}