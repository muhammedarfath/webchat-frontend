import React from 'react'
import { motion } from "framer-motion"

const icon = {
    hidden: {
      opacity: 0,
      pathLength: 0,
      fill: "rgba(0, 0, 0, 0)"  
    },
    visible: {
      opacity: 1,
      pathLength: 1,
      fill: "rgba(0, 0, 0, 1)"  
    }
};


function Logo() {
  const icon = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
  };

  return (
    <div className='border-1 p-3 rounded-xl bg-transparent'>
      <motion.svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 100 100"
        className="item"
        width="50"
        height="50"
      >
        {/* Path for letter 'O' */}
        <motion.circle
          cx="30"
          cy="50"
          r="20"
          fill="none"
          stroke="black"
          strokeWidth="5"
          variants={icon}
          initial="hidden"
          animate="visible"
          transition={{
            default: { duration: 1, ease: "easeInOut" },
            strokeDasharray: { duration: 1, ease: [1, 0, 0.8, 1] }
          }}
        />

        {/* Path for letter 'T' */}
        <motion.path
          d="M70 30
             V70
             M50 30
             H90"
          fill="none"
          stroke="black"
          strokeWidth="10"
          variants={icon}
          initial="hidden"
          animate="visible"
          transition={{
            default: { duration: 1, ease: "easeInOut" },
            strokeDasharray: { duration: 1, ease: [1, 0, 0.8, 1] }
          }}
        />
      </motion.svg>
    </div>
  );
}


export default Logo;
