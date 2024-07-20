import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export const SkeletonTwo = ({ latestNews }) => {
  const variants = {
    initial: {
      width: 0,
    },
    animate: {
      width: "100%",
      transition: {
        duration: 0.2,
      },
    },
    hover: {
      width: ["0%", "100%"],
      transition: {
        duration: 2,
      },
    },
  };
  const sentences = [
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.",
  ];
  return (
    <div>
      <Link to="/news">
        <motion.div
          initial="initial"
          animate="animate"
          whileHover="hover"
          className="flex flex-1 w-full h-full min-h-[6rem] dark:bg-dot-white/[0.2] bg-dot-black/[0.2] flex-col space-y-2"
        >
            <img
              className="object-cover h-1/2 w-full rounded-lg"
              src="https://media.architecturaldigest.com/photos/57c7003fdc03716f7c8289dd/16:9/w_1280,c_limit/IMG%20Worlds%20of%20Adventure%20-%201.jpg"
              alt="img"
            />
            <span className="font-bold text-black">Lorem ipsum dolor sit amet, consectetur adipiscing elit</span>
        </motion.div>
      </Link>
    </div>
  );
};
