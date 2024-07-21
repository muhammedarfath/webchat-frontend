import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import requests from "../../../utils/urls";
import { showErrorToast } from "../../../utils/Toaser";
import axios from "axios";
import { useSelector } from "react-redux";

export const SkeletonFour = () => {
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState([]);
  const { user_id, is_email_verified, username } = useSelector(
    (state) => state.auth
  );

  const isImage = (mediaFile) => {
    const extension = mediaFile.split(".").pop().toLowerCase();
    return ["jpg", "jpeg", "png", "gif", "bmp"].includes(extension);
  };

  useEffect(() => {
    setLoading(true);
    const fetchPosts = async () => {
      try {
        const response = await axios.post(
          `${requests.fetchPosts}${username}/`,
          {
            user_id: user_id,
          }
        );
        if (response.data && is_email_verified) {
          setPosts(response.data.slice(0, 3));
        } else {
          showErrorToast(
            "Please verify your email to explore all Fybox features"
          );
        }
      } catch (error) {
        showErrorToast("Error fetching posts", error);
      }
      setLoading(false);
    };
    fetchPosts();
  }, [username, user_id, is_email_verified]);

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

  // Define the variant function based on index
  const getVariant = (index) => {
    if (index === 0) return first;
    if (index === 2) return second;
    return {}; 
  };

  return (
    <Link to="/reels">
      <motion.div
        initial="initial"
        animate="animate"
        whileHover="hover"
        className="flex flex-1 w-full h-full min-h-[6rem] dark:bg-dot-white/[0.2] bg-dot-black/[0.2] flex-row space-x-2"
      >
        {posts.map((post, index) => (
          <motion.div
            key={index}
            variants={getVariant(index)}
            className="h-full w-1/3 rounded-2xl bg-white p-2 dark:bg-black dark:border-white/[0.1] border border-neutral-200 flex flex-col items-center justify-center"
          >
            {post.media_file ? (
              isImage(post.media_file) ? (
                <img
                  src={`http://127.0.0.1:8000${post.media_file}`}
                  alt="media"
                  height="100"
                  width="100"
                  className="rounded-2xl h-52 w-full"
                />
              ) : (
                <video
                  controls
                  autoPlay
                  muted
                  src={`http://127.0.0.1:8000${post.media_file}`}
                  className="object-cover rounded-2xl h-52 w-full"
                  onEnded={(e) => e.target.play()}
                />
              )
            ) : null}
          </motion.div>
        ))}
      </motion.div>
    </Link>
  );
};
