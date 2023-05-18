"use client";

import { motion } from "framer-motion";

export default function FadeIn({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{
        type: "spring",
        duration: 2,
        stiffness: 100,
        delay: 0.2,
        when: "beforeChildren",
      }}
    >
      {children}
    </motion.div>
  );
}
