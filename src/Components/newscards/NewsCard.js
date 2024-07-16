import React from 'react';
import { motion } from 'framer-motion';

function NewsCard({ news, containerRef, top, rotate, left }) {
  return (
    <motion.div
      style={{ top, rotate, left }} 
      className="w-52 bg-[#EFEFEF] p-4 pb-4"
      drag
      dragElastic={0.65}
      dragConstraints={containerRef}
    >
      <motion.img
        className='w-full'
        src={news.image}
        alt=""
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
      />
      <motion.h1
        className='text-black'
        initial={{ y: -100 }} 
        animate={{ y: 0 }} 
      >
        {news.title}
      </motion.h1>
    </motion.div>
  );
}

export default NewsCard;
