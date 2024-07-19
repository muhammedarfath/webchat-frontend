import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export const SkeletonOne = ({ users, isLoading }) => {
    const variants = {
        initial: {
        x: 0,
        },
        animate: {
        x: 10,
        rotate: 5,
        transition: {
            duration: 0.2,
        },
        },
    };
    const variantsSecond = {
        initial: {
        x: 0,
        },
        animate: {
        x: -10,
        rotate: -5,
        transition: {
            duration: 0.2,
        },
        },
    };
    
    return (
        <div>
        <Link to="/chathome">
            <motion.div
            initial="initial"
            whileHover="animate"
            className="flex flex-1 w-full h-full min-h-[6rem] dark:bg-dot-white/[0.2] bg-dot-black/[0.2] flex-col space-y-2 cursor-pointer"
            >
            {users.length !== 0 ? (
                users.map((user, index) =>
                index !== 1 ? (
                    <motion.div
                    variants={variants}
                    className="flex flex-row rounded-full border border-neutral-100 dark:border-white/[0.2] p-2  items-center space-x-2 bg-white dark:bg-black"
                    >
                    {user.image ? (<img
                        src={`http://127.0.0.1:8000${user.image}`}
                        className="h-6 w-6 rounded-full bg-gradient-to-r from-pink-500 to-violet-500 flex-shrink-0"
                    />) : (
                        <img
                        src="images/profile-image.webp"
                        className="h-6 w-6 rounded-full bg-gradient-to-r flex-shrink-0"
                        />
                    )}
                    <h1 className="w-full bg-gray-100 h-4 rounded-full text-black dark:bg-neutral-900"></h1>
                    </motion.div>
                ) : (
                    <motion.div
                    variants={variantsSecond}
                    className="flex flex-row rounded-full border border-neutral-100 dark:border-white/[0.2] p-2 items-center space-x-2 w-3/4 ml-auto bg-white dark:bg-black"
                    >
                    <h1 className="w-full bg-gray-100 h-4 rounded-full dark:bg-neutral-900"></h1>
                    <img
                        src={`http://127.0.0.1:8000${user.image}`}
                        className="h-6 w-6 rounded-full bg-gradient-to-r from-pink-500 to-violet-500 flex-shrink-0"
                    />
                    </motion.div>
                )
                )
            ) : (
                <>
                <motion.div
                    variants={variants}
                    className="flex flex-row rounded-full border border-neutral-100 dark:border-white/[0.2] p-2  items-center space-x-2 bg-white dark:bg-black"
                >
                    <div className="h-6 w-6 rounded-full bg-gray-100 flex-shrink-0" />
                    <div className="w-full bg-gray-100 h-4 rounded-full dark:bg-neutral-900" />
                </motion.div>
                <motion.div
                    variants={variantsSecond}
                    className="flex flex-row rounded-full border border-neutral-100 dark:border-white/[0.2] p-2 items-center space-x-2 w-3/4 ml-auto bg-white dark:bg-black"
                >
                    <div className="w-full bg-gray-100 h-4 rounded-full dark:bg-neutral-900" />
                    <div className="h-6 w-6 rounded-full bg-gray-100 flex-shrink-0" />
                </motion.div>
                <motion.div
                    variants={variants}
                    className="flex flex-row rounded-full border border-neutral-100 dark:border-white/[0.2] p-2 items-center space-x-2 bg-white dark:bg-black"
                >
                    <div className="h-6 w-6 rounded-full bg-gray-100 flex-shrink-0" />
                    <div className="w-full bg-gray-100 h-4 rounded-full dark:bg-neutral-900" />
                </motion.div>
                </>
            )}
            </motion.div>
        </Link>
        </div>
    );
};