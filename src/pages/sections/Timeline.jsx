import { motion } from "framer-motion";
import "./Timeline.css";

const timelineData = [
  {
    title: "Golden pic 💫",
    text: "The moment everyone smiles...",
    image: "/images/memory1.jpeg",
  },
  {
    title: "Felt Good📸",
    text: "A memory captured forever...",
    image: "/images/memory2.jpeg",
  },
  {
    title: "That Era 💍",
    text: "A question that changed everything...",
    image: "/images/memory3.jpeg",
  },
  {
    title: "Great Times 💖",
    text: "",
    image: "/images/memory4.jpeg",
  },
  {
    title: "Party Starts 🎉",
    text: "Celebrating love with everyone...",
    image: "/images/memory5.jpeg",
  },
  {
    title: "Memories all-around 🎉",
    text: "Cherishing every moment together...",
    image: "/images/memory6.jpeg",
  },
  {
    title: "Bothers- The Pillars 🎉",
    text: "The support system that holds us up...",
    image: "/images/memory7.jpeg",
  },
  {
    title: "Crew 🎉",
    text: "The friends who make life more fun...",
    image: "/images/memory8.jpeg",
  },

];

export default function Timeline({ onNext }) {
  return (
    <div className="timeline-container">
      <h2 className="timeline-title">Your Journey Together 💖</h2>

      <div className="timeline">
        {timelineData.map((item, index) => (
          <motion.div
            key={index}
            className={`timeline-item ${index % 2 === 0 ? "left" : "right"}`}
            initial={{ opacity: 0, x: index % 2 === 0 ? -120 : 120 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="content">
              
              {/* 💖 ICON */}
              {/*<div className="timeline-icon">
                <img src={item.icon} alt="icon" />
              </div>*/}

              {/* 📸 MAIN IMAGE */}
              <img
                src={item.image}
                alt={item.title}
                className="timeline-image"
              />

              {/* 📝 CONTENT */}
              <h3>{item.title}</h3>
              <span>{item.date}</span>
              <p>{item.text}</p>

            </div>
          </motion.div>
        ))}
      </div>

      {/* 🎁 NEXT BUTTON */}
      <button className="next-btn" onClick={onNext}>
        Continue 💖
      </button>
    </div>
  );
}