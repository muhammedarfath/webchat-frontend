import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export const SkeletonTwo = ({ latestNews }) => {
  return (
    <div className="flex flex-col space-y-4">
      {latestNews.map((news, index) => (
        <Link to="/news" key={index} className="block">
          <motion.div
            initial="initial"
            animate="animate"
            whileHover="hover"
            className="flex flex-1 w-full h-full min-h-[6rem] dark:bg-dot-white/[0.2] bg-dot-black/[0.2] flex-col space-y-2"
          >
            <img
              className="object-cover h-1/2 w-full rounded-lg"
              src={news.image}
              alt={news.title}
            />
            <span className="font-bold text-black">{news.title}</span>
          </motion.div>
        </Link>
      ))}
    </div>
  );
};
