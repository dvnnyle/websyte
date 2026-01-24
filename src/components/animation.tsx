import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

interface FadeInProps {
  children: ReactNode;
  duration?: number;
  delay?: number;
}

export const FadeIn = ({ children, duration = 0.5, delay = 0 }: FadeInProps) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration, delay, ease: "easeInOut" }}
    >
      {children}
    </motion.div>
  );
};
