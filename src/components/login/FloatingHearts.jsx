import { motion } from "framer-motion";

export default function FloatingHearts() {
  return (
    <>
      {[...Array(25)].map((_, i) => {
        const randomLeft = Math.random() * 100; // FULL WIDTH
        const randomDelay = Math.random() * 5;
        const randomDuration = 6 + Math.random() * 4;
        const randomSize = 12 + Math.random() * 18;

        return (
          <motion.div
            key={i}
            className="heart"
            style={{
              left: `${randomLeft}vw`, // ✅ THIS IS THE FIX
              fontSize: `${randomSize}px`,
            }}
            initial={{
              y: "110vh",
              opacity: 0,
            }}
           animate={{
  y: "-20vh",
  x: [0, 15, -15, 10, 0],
  opacity: [0, 1, 1, 0],
}}
            transition={{
              duration: randomDuration,
              repeat: Infinity,
              delay: randomDelay,
              ease: "linear",
            }}
          >
            💖
          </motion.div>
        );
      })}
    </>
  );
}