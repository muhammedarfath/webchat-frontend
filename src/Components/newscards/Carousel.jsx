import React, { useState, useEffect, useRef } from 'react';
import CarouselButton from './CarouselButton';

function Carousel({ news }) {

    const [currentSlide, setCurrentSlide] = useState(0);
    const slideInterval = useRef(null);

    const handlePrev = () => {
        setCurrentSlide((prevSlide) => (prevSlide === 0 ? news.length - 1 : prevSlide - 1));
    };
    const handleNext = () => {
        setCurrentSlide((prevSlide) => (prevSlide === news.length - 1 ? 0 : prevSlide + 1));
    };
    const goToSlide = (index) => {
        setCurrentSlide(index);
    };

    useEffect(() => {
        slideInterval.current = setInterval(() => {
            handleNext();
        }, 5000);
        return () => clearInterval(slideInterval.current);
    }, []);

    return (
        <div id="carouselExampleCaptions" className="relative w-full h-96">
            <div className="absolute bottom-0 left-0 right-0 z-[2] mx-[15%] mb-4 flex list-none justify-center p-0">
                {news.map((_, index) => (
                    <button
                        key={index}
                        type="button"
                        onClick={() => goToSlide(index)}
                        className={`mx-[3px] box-content h-[3px] w-[30px] flex-initial cursor-pointer border-0 border-y-[10px] border-solid border-transparent bg-white bg-clip-padding p-0 -indent-[999px] opacity-50 transition-opacity duration-[600ms] ease-[cubic-bezier(0.25,0.1,0.25,1.0)] motion-reduce:transition-none ${currentSlide === index ? 'opacity-100' : ''}`}
                        aria-current={currentSlide === index ? 'true' : 'false'}
                        aria-label={`Slide ${index + 1}`}></button>
                ))}
            </div>
            <div className="relative w-full h-full overflow-hidden after:clear-both after:block after:content-['']">
                {news.map((item, index) => (
                    <div
                        key={index}
                        className={`absolute inset-0 transition-transform duration-[600ms] ease-in-out motion-reduce:transition-none ${currentSlide === index ? 'block' : 'hidden'}`}
                        style={{ backfaceVisibility: 'hidden' }}>
                        <img
                            src={item.image}
                            className="block object-contain w-full"
                            alt={item.title} />
                        <div className="absolute inset-x-[15%] bottom-5 hidden py-5 text-center text-black font-bold md:block">
                            <h5 className="text-xl">{item.title}</h5>
                            <p>{item.description}</p>
                        </div>
                    </div>
                ))}
            </div>
            <CarouselButton handlePrev={handlePrev} handleNext={handleNext} />
        </div>
    );
}

export default Carousel;
