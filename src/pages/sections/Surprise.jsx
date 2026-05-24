import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import "./Surprice.css";

import { db } from "../../firebase";
import { ref, onValue, remove } from "firebase/database";

export default function Surprise() {
console.log("🎁 Surprise component mounted!"); // ADD THIS LINE
  const [opened, setOpened] = useState(false);

  const [wishes, setWishes] = useState([]);

  const [startIndex, setStartIndex] = useState(0);

  // 🔥 FETCH REALTIME WISHES
  useEffect(() => {
  const wishesRef = ref(db, "wishes");

  console.log("Attempting to read from:", wishesRef.toString()); // 👈 shows exact URL

  const unsubscribe = onValue(
    wishesRef,
    (snapshot) => {
      console.log("Snapshot exists:", snapshot.exists()); // 👈 true or false
      console.log("Snapshot val:", snapshot.val());       // 👈 actual data or null

      const data = snapshot.val();
      if (data) {
        const loadedWishes = Object.entries(data).map(([id, value]) => ({
          id,
          ...value,
        }));
        setWishes(loadedWishes.reverse());
      } else {
        setWishes([]);
      }
    },
    (error) => {
      console.error("Read error:", error);
    }
  );

  return () => unsubscribe();
}, []);

  // 🔄 ROTATE EVERY 10 SEC
  useEffect(() => {

    if (!opened || wishes.length === 0) return;

    const interval = setInterval(() => {

      setStartIndex((prev) =>
        (prev + 3) % wishes.length
      );

    }, 10000);

    return () => clearInterval(interval);

  }, [opened, wishes]);

  // 🗑️ DELETE WISH
  const deleteWish = async (id) => {

    try {
      await remove(ref(db, `wishes/${id}`));
    } catch (error) {
      console.error(error);
    }

  };

  // 💌 SHOW 3 WISHES
  const getVisibleWishes = () => {

    if (wishes.length <= 3) return wishes;

    let visible = [];

    for (let i = 0; i < 3; i++) {
      visible.push(
        wishes[(startIndex + i) % wishes.length]
      );
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
          transition={{ duration: 1 }}
        >

          <h2>💖 Forever Begins Now 💖</h2>

          <p>
            May your journey be filled with endless love,
            laughter, and beautiful memories.
          </p>

          <p>
            This is just the beginning of something magical…
          </p>

          <h3>With Love 💌</h3>

          {/* 📸 FINAL IMAGE */}
          <img
            src="/images/final.jpeg"
            alt="final memory"
          />

          {/* 💌 WISHES */}
          <div className="wishes-display">

            <h3>Messages from Loved Ones 💖</h3>

            {wishes.length === 0 ? (

              <p>No wishes yet...</p>

            ) : (

              <div className="wish-group">

                {getVisibleWishes().map((w, i) => (

                  <motion.div
                    key={w.id}
                    className="wish-card"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                  >

                    <h4>{w.name}</h4>

                    <p>{w.message}</p>

                    {/* 🗑️ DELETE */}
                    <span
                      className="delete-btn"
                      onClick={() => deleteWish(w.id)}
                    >
                      🗑️
                    </span>

                  </motion.div>

                ))}

              </div>

            )}
          </div>

          {/* 🎉 CONFETTI */}
          <div className="confetti">
            🎉 🎊 💖 ✨ 🎉 💖 🎊 ✨
          </div>

        </motion.div>
      )}
    </div>
  );
}