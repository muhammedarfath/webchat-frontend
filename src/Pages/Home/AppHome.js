import React from 'react'
import { BackgroundGradientAnimation } from "../../Components/ui/background-gradient-animation";
import { BentoGridThirdDemo } from '../../Components/grid/Grid';
import Footer from '../../Components/footer/Footer';


function AppHome() {
  return (
    <BackgroundGradientAnimation>
      <div className='w-screen h-screen overflow-auto flex flex-col'>
        <div className="inset-0 h-screen py-[25rem] flex items-center justify-center text-white font-bold px-4 pointer-events-none text-3xl text-center md:text-4xl lg:text-7xl">
          <p className="bg-clip-text text-transparent drop-shadow-2xl bg-gradient-to-b from-white/80 to-white/20">
            Gradients X Animations
          </p>
        </div>
        <div className="h-screen mb-7">
         <BentoGridThirdDemo />
        </div>
        <div>
          <Footer/>
        </div>
      </div>

    </BackgroundGradientAnimation>
  )
}

export default AppHome
