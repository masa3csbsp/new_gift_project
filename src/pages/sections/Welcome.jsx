import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import "./welcome.css";

export default function Welcome({ onNext }) {
  const lines = [
    "Some stories are written by fate…",
    "Some moments are meant to last forever…",
    "And this…",
    "...is one of those stories 💖",
  ];

  const [currentLine, setCurrentLine] = useState(0);
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    if (currentLine < lines.length) {
      const timer = setTimeout(() => {
        setCurrentLine((prev) => prev + 1);
      }, 2000);
      return () => clearTimeout(timer);
    } else {
      setShowButton(true);
    }
  }, [currentLine]);

  return (
    <div className="welcome-container">
      <div className="text-area">
        {lines.slice(0, currentLine).map((line, index) => (
          <motion.p
            key={index}
            initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 1 }}
          >
            {line}
          </motion.p>
        ))}

        {showButton && (
          <>
            <motion.h2
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              Dear Malini Akka & Arun Kumar Mama 💖
            </motion.h2>

            <motion.button
              className="start-btn"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={onNext}
            >
              Shall we begin ✨
            </motion.button>
          </>
        )}
      </div>
    </div>
  );
}