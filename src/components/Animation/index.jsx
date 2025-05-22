import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";

export const FadeInSection = ({ children, delay = 0 }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });
  
    return (
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 40 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1, delay }} // ← increased duration from 0.6 to 1
      >
        {children}
      </motion.div>
    );
  };
  
