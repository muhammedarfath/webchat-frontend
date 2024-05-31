import React from 'react'
import { BackgroundGradientAnimation } from "../../Components/ui/background-gradient-animation";
import { BentoGridThirdDemo } from '../../Components/grid/Grid';

function AppHome() {
  return (
    <BackgroundGradientAnimation>
      <div className='relative w-screen h-screen overflow-auto'>
        <div className="absolute inset-0 flex items-center justify-center text-white font-bold px-4 pointer-events-none text-3xl text-center md:text-4xl lg:text-7xl">
          <p className="bg-clip-text text-transparent drop-shadow-2xl bg-gradient-to-b from-white/80 to-white/20">
            Gradients X Animations
          </p>
        </div>
        <div className="h-screen"></div>
        <BentoGridThirdDemo />
      </div>
    </BackgroundGradientAnimation>
  )
}

export default AppHome
