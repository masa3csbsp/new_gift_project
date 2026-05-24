import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import "./letter.css";

export default function Letter({ onNext }) {
  const [opened, setOpened] = useState(false);
  const [showText, setShowText] = useState(false);
  const [displayedText, setDisplayedText] = useState("");

  const fullText = `
Dear Malini Akka & Arun Kumar Mama 💖,

Some stories are rare.
Some connections are magical.
And yours… is something truly special.

From laughter to love,
from moments to memories,
you’ve built something beautiful together.

May your journey ahead be filled with
endless smiles, love, and togetherness.

This is just the beginning of your forever… ✨
`;

  // Typing effect
  useEffect(() => {
    if (showText) {
      let i = 0;
      const interval = setInterval(() => {
        setDisplayedText(fullText.slice(0, i));
        i++;
        if (i > fullText.length) clearInterval(interval);
      }, 30);

      return () => clearInterval(interval);
    }
  }, [showText]);

  return (
  <div className="letter-container">

    {/* 🎥 BACKGROUND VIDEO */}
    

    {/* 🌑 OVERLAY */}
    <div className="overlay"></div>

    {/* 💌 CONTENT */}
    <div className="letter-content">
      {!opened ? (
        <motion.div
          className="envelope"
          whileHover={{ scale: 1.05 }}
          onClick={() => {
            setOpened(true);
            setTimeout(() => setShowText(true), 1000);
          }}
        >
          💌
          <p>Click to open</p>
        </motion.div>
      ) : (
        <motion.div
          className="letter-paper"
          initial={{ y: 200, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <pre>{displayedText}</pre>

          {displayedText.length === fullText.length && (
            <motion.button
              className="next-btn"
              whileHover={{ scale: 1.1 }}
              onClick={onNext}
            >
              Continue 💖
            </motion.button>
          )}
        </motion.div>
      )}
    </div>
  </div>
);
}