import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { twMerge } from 'tailwind-merge';

function NewsCard({url, top, rotate, left, containerRef, className }) {
  const [zIndex, setZindex] = useState(0);

  const updateZindex = () => {
    const els = document.querySelectorAll('.drag-elements');
    let maxZindex = -Infinity;
    els.forEach((el) => {
      let zIndex = parseInt(window.getComputedStyle(el).getPropertyValue('z-index'));
      if (!isNaN(zIndex) && zIndex > maxZindex) {
        maxZindex = zIndex;
      }
    });
    setZindex(maxZindex + 1);
  };

  return (
    <motion.div
      drag
      dragConstraints={containerRef}
      dragElastic={0.65}
      style={{ top, rotate, left, zIndex }}
      className={twMerge('drag-elements w-64 bg-black p-1 pb-4', className)}
      onMouseDown={updateZindex} 
    >
      <motion.img
        src={url}
        className="w-full h-full object-cover"
      />
    </motion.div>
  );
}

export default NewsCard;
