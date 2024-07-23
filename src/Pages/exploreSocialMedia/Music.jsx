import React from "react";
import { motion } from "framer-motion";
import { FaHeadphonesAlt } from "react-icons/fa";
import { Card, CardFooter, Image, Button } from "@nextui-org/react";

function Music() {
  const variants = {
    initial: {
      backgroundPosition: "0 50%",
    },
    animate: {
      backgroundPosition: ["0, 50%", "100% 50%", "0 50%"],
    },
  };
  return (
    <div className="w-full h-full overflow-auto">
      <motion.div
        initial="initial"
        animate="animate"
        variants={variants}
        transition={{
          duration: 5,
          repeat: Infinity,
          repeatType: "reverse",
        }}
        className="flex flex-1 w-full h-full min-h-[6rem] dark:bg-dot-white/[0.2] rounded-lg bg-dot-black/[0.2] flex-col space-y-2"
        style={{
          background:
            "linear-gradient(-45deg, #ffffff, #f0f0f0, #dcdcdc, #ffffff)",
          backgroundSize: "400% 400%",
        }}
      >
        <motion.div className="h-full w-full rounded-lg gap-3 flex flex-col p-5">
          <div className="flex w-full justify-center gap-4">
            <h1 className="text-9xl font-bold text-black ">Musify</h1>
            <FaHeadphonesAlt className="text-9xl font-bold text-black " />
          </div>

          <div className="grid grid-cols-5 gap-9">
            {Array.from({ length: 10 }).map((_, index) => (
              <Card
                key={index}
                isFooterBlurred
                radius="lg"
                className="border-none"
              >
                <Image
                  alt="Woman listing to music"
                  className="object-cover"
                  height={200}
                  src="https://nextui.org/images/hero-card.jpeg"
                  width={200}
                />
                <CardFooter className="justify-between before:bg-white/10 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10">
                  <p className="text-tiny text-white/80">Available soon.</p>
                  <Button
                    className="text-tiny text-white bg-black/20"
                    variant="flat"
                    color="default"
                    radius="lg"
                    size="sm"
                  >
                    Notify me
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}

export default Music;
