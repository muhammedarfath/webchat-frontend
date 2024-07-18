"use client";
import { cn } from "../../utils/cn";
import React, { useEffect, useState } from "react";
import { BentoGrid, BentoGridItem } from "../../Components/ui/bento-grid";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import { showErrorToast } from "../../utils/Toaser";
import requests from "../../utils/urls";

export function BentoGridThirdDemo() {
  const [users, setUsers] = useState([]);
  const { email, user_id } = useSelector((state) => state.auth);
  const [isLoading, setIsLoading] = useState(true);
  const [latestNews, setLatestNews] = useState([])
  useEffect(() => {
    setIsLoading(true);
    const fetchUsersWithLastMessages = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/home/last-three-messages/${user_id}/`
        );
        if (response.status === 200) {
          setUsers(response.data);
        }
      } catch (error) {
        console.error("Error fetching users with last messages:", error);
      }
      setIsLoading(false);
    };

    fetchUsersWithLastMessages();
  }, [user_id]);


  useEffect(() => {
    setIsLoading(true);
    const fetchLatestNews = async () => {
      try {
        const response = await axios.get(requests.world);
        console.log(response, "wht");
        const articles = response.data.articles.slice(0, 1);
        if (response) {
          setLatestNews(articles);
        } else {
          showErrorToast("Please verify your email to explore all Fybox features")
        }
      } catch (error) {
        showErrorToast('Error fetching top headlines:', error)
      }
      setIsLoading(false);
    };
    fetchLatestNews();
  }, [user_id]);




  return (
    <BentoGrid className="max-w-4xl mx-auto md:auto-rows-[20rem]">
      {items(users, latestNews, isLoading).map((item, i) => (
        <BentoGridItem
          key={i}
          title={item.title}
          description={item.description}
          header={item.header}
          className={cn("[&>p:text-lg]", item.className)}
          icon={item.icon}
        />
      ))}
    </BentoGrid>
  );
}
const Skeleton = () => (
  <div className="flex flex-1 w-full h-full max-h-[20vh] rounded-xl  dark:bg-dot-white/[0.2] bg-dot-black/[0.2] [mask-image:radial-gradient(ellipse_at_center,white,transparent)]  border border-transparent dark:border-white/[0.2] bg-neutral-100 dark:bg-black"></div>
);

const SkeletonOne = ({ users, isLoading }) => {
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
const SkeletonTwo = ({ latestNews }) => {
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
  const arr = new Array(6).fill(0);
  return (
    <div>
      <Link to="/news">
        <motion.div
          initial="initial"
          animate="animate"
          whileHover="hover"
          className="flex flex-1 w-full h-full min-h-[6rem] dark:bg-dot-white/[0.2] bg-dot-black/[0.2] flex-col space-y-2"
        >
          {arr.map((news, i) => (
            <motion.div
              key={"skelenton-two" + i}
              variants={variants}
              style={{
                maxWidth: Math.random() * (100 - 40) + 40 + "%",
              }}
              className="flex flex-row rounded-full border border-neutral-100 dark:border-white/[0.2] p-2  items-center space-x-2 bg-neutral-100 dark:bg-black w-full h-4"
            >
            </motion.div>
          ))}
        </motion.div>
      </Link>
    </div>
  );
};
const SkeletonThree = () => {
  const variants = {
    initial: {
      backgroundPosition: "0 50%",
    },
    animate: {
      backgroundPosition: ["0, 50%", "100% 50%", "0 50%"],
    },
  };
  return (
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
          "linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab)",
        backgroundSize: "400% 400%",
      }}
    >
      <motion.div className="h-full w-full rounded-lg"></motion.div>
    </motion.div>
  );
};
const SkeletonFour = () => {
  const first = {
    initial: {
      x: 20,
      rotate: -5,
    },
    hover: {
      x: 0,
      rotate: 0,
    },
  };
  const second = {
    initial: {
      x: -20,
      rotate: 5,
    },
    hover: {
      x: 0,
      rotate: 0,
    },
  };
  return (
    <Link to="/reels">
      <motion.div
        initial="initial"
        animate="animate"
        whileHover="hover"
        className="flex flex-1 w-full h-full min-h-[6rem] dark:bg-dot-white/[0.2] bg-dot-black/[0.2] flex-row space-x-2"
      >
        <motion.div
          variants={first}
          className="h-full w-1/3 rounded-2xl bg-white p-4 dark:bg-black dark:border-white/[0.1] border border-neutral-200 flex flex-col items-center justify-center"
        >
          <img
            src="https://pbs.twimg.com/profile_images/1417752099488636931/cs2R59eW_400x400.jpg"
            alt="avatar"
            height="100"
            width="100"
            className="rounded-full h-10 w-10"
          />
          <p className="sm:text-sm text-xs text-center font-semibold text-neutral-500 mt-4">
            Just code in Vanilla Javascript
          </p>
          <p className="border border-red-500 bg-red-100 dark:bg-red-900/20 text-red-600 text-xs rounded-full px-2 py-0.5 mt-4">
            Delusional
          </p>
        </motion.div>
        <motion.div className="h-full relative z-20 w-1/3 rounded-2xl bg-white p-4 dark:bg-black dark:border-white/[0.1] border border-neutral-200 flex flex-col items-center justify-center">
          <img
            src="https://pbs.twimg.com/profile_images/1417752099488636931/cs2R59eW_400x400.jpg"
            alt="avatar"
            height="100"
            width="100"
            className="rounded-full h-10 w-10"
          />
          <p className="sm:text-sm text-xs text-center font-semibold text-neutral-500 mt-4">
            Tailwind CSS is cool, you know
          </p>
          <p className="border border-green-500 bg-green-100 dark:bg-green-900/20 text-green-600 text-xs rounded-full px-2 py-0.5 mt-4">
            Sensible
          </p>
        </motion.div>
        <motion.div
          variants={second}
          className="h-full w-1/3 rounded-2xl bg-white p-4 dark:bg-black dark:border-white/[0.1] border border-neutral-200 flex flex-col items-center justify-center"
        >
          <img
            src="https://pbs.twimg.com/profile_images/1417752099488636931/cs2R59eW_400x400.jpg"
            alt="avatar"
            height="100"
            width="100"
            className="rounded-full h-10 w-10"
          />
          <p className="sm:text-sm text-xs text-center font-semibold text-neutral-500 mt-4">
            I love angular, RSC, and Redux.
          </p>
          <p className="border border-orange-500 bg-orange-100 dark:bg-orange-900/20 text-orange-600 text-xs rounded-full px-2 py-0.5 mt-4">
            Helpless
          </p>
        </motion.div>
      </motion.div>
    </Link>
  );
};

const SkeletonFive = () => {
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
    <motion.div
      initial="initial"
      whileHover="animate"
      className="flex flex-1 w-full h-full min-h-[6rem] dark:bg-dot-white/[0.2] bg-dot-black/[0.2] flex-col space-y-2"
    >
      <motion.div
        variants={variants}
        className="flex flex-row rounded-2xl border border-neutral-100 dark:border-white/[0.2] p-2  items-start space-x-2 bg-white dark:bg-black"
      >
        <img
          src="https://pbs.twimg.com/profile_images/1417752099488636931/cs2R59eW_400x400.jpg"
          alt="avatar"
          height="100"
          width="100"
          className="rounded-full h-10 w-10"
        />
        <p className="text-xs text-neutral-500">
          There are a lot of cool framerworks out there like React, Angular,
          Vue, Svelte that can make your life ....
        </p>
      </motion.div>
      <motion.div
        variants={variantsSecond}
        className="flex flex-row rounded-full border border-neutral-100 dark:border-white/[0.2] p-2 items-center justify-end space-x-2 w-3/4 ml-auto bg-white dark:bg-black"
      >
        <p className="text-xs text-neutral-500">Use PHP.</p>
        <div className="h-6 w-6 rounded-full bg-gradient-to-r from-pink-500 to-violet-500 flex-shrink-0" />
      </motion.div>
    </motion.div>
  );
};

const items = (users, latestNews, isLoading) => [
  {
    title: "Chatify",
    // description: (
    //   <span className="text-sm">
    //        Explore diverse conversations with people near and far.
    //   </span>
    // ),
    header: <SkeletonOne users={users} isLoading={isLoading} />,
    className: "md:col-span-1",
    // icon: <IconClipboardCopy className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "Newsify",
    // description: (
    //   <span className="text-sm">
    //     Let AI handle the proofreading of your documents.
    //   </span>
    // ),
    header: <SkeletonTwo latestNews={latestNews} />,
    className: "md:col-span-1",
    // icon: <IconFileBroken className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "Houseify",
    // description: (
    //   <span className="text-sm">
    //     Get AI-powered suggestions based on your writing context.
    //   </span>
    // ),
    header: <SkeletonThree />,
    className: "md:col-span-1",
    // icon: <IconSignature className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "Reelsify",
    // description: (
    //   <span className="text-sm">
    //     Understand the sentiment of your text with AI analysis.
    //   </span>
    // ),
    header: <SkeletonFour />,
    className: "md:col-span-2",
    // icon: <IconTableColumn className="h-4 w-4 text-neutral-500" />,
  },

  {
    title: "Snapify",
    // description: (
    //   <span className="text-sm">
    //     Summarize your lengthy documents with AI technology.
    //   </span>
    // ),
    header: <SkeletonFive />,
    className: "md:col-span-1",
    // icon: <IconBoxAlignRightFilled className="h-4 w-4 text-neutra  l-500" />,
  },
];
