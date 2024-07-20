import React, { useContext, useState } from "react";
import AvatarProfile from "../avatar/Avatar_profile";
import { BsThreeDots } from "react-icons/bs";
import Comment from "./Comment";
import CommentCards from "./CommentCards";
import { TbMessageCircle } from "react-icons/tb";
import { PostContext } from "./PostProvider";


function PostModalContent() {
  const { selectedPost, setSelectedPost } = useContext(PostContext);
  const [showFullCaption, setShowFullCaption] = useState(false);
  const [showAllTags, setShowAllTags] = useState(false);


  const formatDate = (dateTimeString) => {
    const options = { hour: "numeric", minute: "numeric", hour12: true };
    const date = new Date(dateTimeString);
    const timeFormatted = date.toLocaleTimeString("en-US", options);
    const dateFormatted = date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
    return `${timeFormatted} · ${dateFormatted}`;
  };

  const toggleTags = (e) => {
    e.stopPropagation();
    setShowAllTags(!showAllTags);
  };

  const toggleCaption = (e) => {
    e.stopPropagation();
    setShowFullCaption(!showFullCaption);
  };

  return (
    <div className="hidden lg:block md:block lg:w-1/3 sm:w-full flex-1 gap-5 pl-2 mt-4">
      <div className="flex w-full justify-between">
        <div className="flex flex-col w-full">
          <div className="flex gap-2 items-center">
            <AvatarProfile
              image={selectedPost.profile.image}
              username={selectedPost.user.username}
            />
            <h1>{selectedPost.user.username}</h1>
          </div>
          {selectedPost.caption && (
            <div className="ml-9 w-full">
              {showFullCaption ? (
                <span>{selectedPost.caption}</span>
              ) : (
                <span>{selectedPost.caption.slice(0, 100)}</span>
              )}
              {selectedPost.caption.length > 100 && (
                <button className="text-blue-500 ml-1" onClick={toggleCaption}>
                  {showFullCaption ? "See less..." : "See more..."}
                </button>
              )}
            </div>
          )}
          <div className="ml-9 w-full">
            {selectedPost.tags &&
              selectedPost.tags
                .slice(0, showAllTags ? undefined : 3)
                .map((tag) => (
                  <a key={tag.id} className="text-[#1D9BF0]">
                    {tag.title}
                  </a>
                ))}
            {selectedPost.tags && selectedPost.tags.length > 3 && (
              <button className="text-blue-500 ml-1" onClick={toggleTags}>
                {showAllTags ? "Show less..." : `Show all`}
              </button>
            )}
          </div>
          <h1 className="ml-8 w-full text-[#536471]">
            {formatDate(selectedPost.posted)}
          </h1>
        </div>
        <BsThreeDots className="mr-9 text-4xl cursor-pointer" />
      </div>
      <hr className="w-full mt-2" />
      <Comment />
      <div className="overflow-auto">
        {!selectedPost.comments ? (
          <div className="w-full h-full flex justify-center items-center">
            <h5>No Comments Yet</h5>
          </div>
        ) : (
          <CommentCards />
        )}
      </div>
    </div>
  );
}

export default PostModalContent;


