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
        "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore.",
        "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia.",
        "Mollit anim id est laborum, nulla pariatur excepteur sint occaecat."
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
            {sentences.map((sentence, i) => (
                <motion.div
                key={"skeleton-two" + i}
                variants={variants}
                style={{
                    maxWidth: Math.random() * (100 - 40) + 40 + "%",
                }}
                className="flex flex-row rounded-full border border-neutral-100 dark:border-white/[0.2] p-2 items-center space-x-2 bg-neutral-100 dark:bg-black w-full h-4"
                >
                <span className="truncate">{sentence}</span>
                </motion.div>
            ))}
            </motion.div>
        </Link>
        </div>
    );
    
    };