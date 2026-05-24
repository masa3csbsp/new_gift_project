import { motion } from "framer-motion";
import "./gallery.css";
import { useState } from "react";

const wishesData = [
  {
    name: "Appaaaa",
    image: "/images/person1.jpeg",
    message: "Wishing you a lifetime of love and happiness 💖",
  },
  {
    name: "Maaa",
    image: "/images/person2.jpeg",
    message: "May your journey together be filled with joy ✨",
  },
  {
    name: "Anne!!",
    image: "/images/person3.jpeg",
    message: "Stay blessed and happy always 💕",
  },
];

export default function Wishes({ onNext }) {
  const [selected, setSelected] = useState(null);

  return (
    <div className="wishes-container">
      <h2>Voices of Love 💖</h2>

      {/* 💖 SMALL CARDS */}
      <div className="wishes-grid">
        {wishesData.map((wish, index) => (
          <motion.div
            key={index}
            className="card"
            whileHover={{ scale: 1.05 }}
            onClick={() => setSelected(wish)}
          >
            <div className="card-inner">

              {/* FRONT */}
              <div className="card-front">
                <img src={wish.image} alt="" />
                <p>{wish.name}</p>
              </div>

              {/* BACK */}
              <div className="card-back">
                <p>{wish.message}</p>
              </div>

            </div>
          </motion.div>
        ))}
      </div>

      {/* 🎬 VIDEO SECTION */}
      <div className="video-container">
        <video autoPlay loop muted playsInline>
          <source src="/videos/memory-video.mp4" type="video/mp4" />
        </video>
      </div>

      {/* 💌 POPUP */}
      {selected && (
        <div className="popup" onClick={() => setSelected(null)}>
          <motion.div
            className="popup-content"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
          >
            <img src={selected.image} alt="" />
            <h3>{selected.name}</h3>
            <p>{selected.message}</p>
          </motion.div>
        </div>
      )}

      {/* 🎁 BUTTON */}
      <button className="next-btn" onClick={onNext}>
        Continue 💖
      </button>
    </div>
  );
}