import React from 'react'
import { motion } from "framer-motion"

function DrowLogo() {
  return (
    <div>
<motion.img 
    src="images/LOGO4.png" 
    alt="image" 
    className='max-w-40 max-h-40 rounded-full absolute top-8 left-10  cursor-pointer' 
    drag 
/>
    </div>
  )
}

export default DrowLogo
