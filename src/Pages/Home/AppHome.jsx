import { motion } from "framer-motion";
import React, { useEffect } from "react";
import { AuroraBackground } from "../../Components/ui/background-gradient-animation";
import { BentoGridThirdDemo } from "../../Components/grid/Grid";
import Footer from "../../Components/footer/Footer";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Header from "../../Components/header/Header";
import { useDisclosure } from "@nextui-org/react";
import EmailVerifiedModal from "../../Components/auth/EmailVerifiedModal";

function AppHome() {
  const { authTokens,is_email_verified } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    if (!authTokens) {
      navigate("/login");
    }
    if (!is_email_verified){
      onOpen();
    }
  }, [authTokens, navigate]);

  return (
    <AuroraBackground className="dark:bg-neutral-950">
      <Header />
      <EmailVerifiedModal isOpen={isOpen} onClose={onClose}/>
      <motion.div
        initial={{ opacity: 0.0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.3,
          duration: 0.8,
          ease: "easeInOut",
        }}
        className="relative flex flex-col gap-4 items-center justify-center px-4 lg:mt-[45rem] mt-[95rem] md:mt-[50rem]"
        >
        <div className="text-3xl md:text-7xl font-bold dark:text-white  text-center">
          fybox.
        </div>
        <div className="font-extralight text-base md:text-4xl dark:text-neutral-200 py-4">
          All your media needs just one tap.
        </div>
        <div className="h-full">
          <BentoGridThirdDemo />
        </div>
      </motion.div>
      <div className="w-full mt-4">
        <Footer />
      </div>
    </AuroraBackground>
  );
}

export default AppHome;
