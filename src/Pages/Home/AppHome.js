
import { motion } from "framer-motion";
import React from "react";
import { AuroraBackground } from "../../Components/ui/background-gradient-animation";
import { BentoGridThirdDemo } from '../../Components/grid/Grid';
import Footer from '../../Components/footer/Footer'
import { useSelector } from "react-redux";


function AppHome() {

  const {email} = useSelector(state=>state.auth)






  return (

    <AuroraBackground>
      <motion.div
        initial={{ opacity: 0.0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.3,
          duration: 0.8,
          ease: "easeInOut",
        }}
        className="relative flex flex-col gap-4 items-center justify-center px-4 lg:mt-[45rem] mt-[95rem] md:mt-[50rem] "
      >
        
        <div className="text-3xl md:text-7xl font-bold dark:text-white text-center">
          Background lights are cool you know.
        </div>
        <div className="font-extralight text-base md:text-4xl dark:text-neutral-200 py-4">
          And this, is chemical burn.
        </div>
        <button className="bg-black dark:bg-white rounded-full w-fit text-white dark:text-black px-4 py-2">
          Debug now
        </button>
         <div className="h-full">
         <BentoGridThirdDemo />
          </div>
      </motion.div>
      <div className="w-full mt-4">
        <Footer/>
      </div>
    </AuroraBackground>
  )
}

export default AppHome
