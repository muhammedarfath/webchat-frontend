import React from 'react'
import { motion } from "framer-motion"
import { FaCameraRetro } from "react-icons/fa";

function DrowLogo() {
  return (
    <div>
    <motion.div 
        className='max-w-28 border-1 border-black rounded-xl  p-1' 
        drag 
    >
     <FaCameraRetro className='lg:text-8xl text-7xl ' />
    </motion.div>
    </div>
  )
}

export default DrowLogo
