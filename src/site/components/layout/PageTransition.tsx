import type { ReactNode } from "react";
import { motion } from "motion/react";

type PageTransitionProps = {
  children: ReactNode;
};

const pageVariants = {
  initial: { opacity: 0, y: 24, filter: "blur(8px)" },
  animate: { opacity: 1, y: 0, filter: "blur(0px)" },
  exit: { opacity: 0, y: -16, filter: "blur(6px)" },
};

export default function PageTransition({ children }: PageTransitionProps) {
  return (
    <motion.main
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className="bg-background text-foreground"
    >
      {children}
    </motion.main>
  );
}
