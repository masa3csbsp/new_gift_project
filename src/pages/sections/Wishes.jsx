import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import "./Surprice.css";

export default function Surprise() {
  const [opened, setOpened] = useState(false);
  const [wishes, setWishes] = useState([]);
  const [startIndex, setStartIndex] = useState(0);

  // Load wishes when opened
  useEffect(() => {
    if (opened) {
      const stored = JSON.parse(localStorage.getItem("wishes")) || [];
      setWishes(stored);
    }
  }, [opened]);

  // 🔄 Rotate messages every 10 sec
  useEffect(() => {
    if (!opened || wishes.length === 0) return;

    const interval = setInterval(() => {
      setStartIndex((prev) => (prev + 3) % wishes.length);
    }, 10000);

    return () => clearInterval(interval);
  }, [opened, wishes]);

  // 🗑️ Delete wish
  const deleteWish = (index) => {
    const updated = [...wishes];
    updated.splice(index, 1);

    setWishes(updated);
    localStorage.setItem("wishes", JSON.stringify(updated));
  };

  // 📦 Get 3 wishes at a time (loop safe)
  const getVisibleWishes = () => {
    if (wishes.length <= 3) return wishes;

    let visible = [];
    for (let i = 0; i < 3; i++) {
      visible.push(wishes[(startIndex + i) % wishes.length]);
    }
    return visible;
  };

  return (
    <div className="surprise-container">
      {!opened ? (
        <motion.div
          className="gift-box"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setOpened(true)}
        >
          🎁
          <p>Click to open your final surprise</p>
        </motion.div>
      ) : (
        <motion.div
          className="final-message"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <h2>💖 Forever Begins Now 💖</h2>

          <p>
            May your journey be filled with endless love,
            laughter, and beautiful memories.
          </p>
          {/* 💌 ROTATING WISHES */}
          <div className="wishes-display">
            <h3>Messages from Loved Ones 💖</h3>

            {wishes.length === 0 ? (
              <p>No wishes yet...</p>
            ) : (
              <div className="wish-group">
                {getVisibleWishes().map((w, i) => {
                  const actualIndex = (startIndex + i) % wishes.length;

                  return (
                    <motion.div
                      key={actualIndex}
                      className="wish-card"
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6 }}
                    >
                      <h4>{w.name}</h4>
                      <p>{w.message}</p>

                      {/* 🗑️ DELETE BUTTON */}
                      <span
                        className="delete-btn"
                        onClick={() => deleteWish(actualIndex)}
                      >
                        🗑️
                      </span>
                    </motion.div>
                  );
                })}
              </div>
            )}
          </div>

          <div className="confetti">
            🎉 🎊 💖 ✨ 🎉 💖 🎊 ✨
          </div>
        </motion.div>
      )}
    </div>
  );
}