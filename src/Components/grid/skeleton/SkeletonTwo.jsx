import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export const SkeletonTwo = ({ latestNews }) => {

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
