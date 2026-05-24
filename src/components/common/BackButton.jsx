import { motion } from "framer-motion";
import "./BackButton.css";

export default function BackButton({ onBack }) {
  return (
    <motion.button
      className="back-btn"
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.9 }}
      onClick={onBack}
    >
      ← Back
    </motion.button>
  );
}