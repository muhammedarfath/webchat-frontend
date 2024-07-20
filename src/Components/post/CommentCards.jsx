import React, { useContext } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Avatar,
  Button,
} from "@nextui-org/react";
import { AiOutlineLike } from "react-icons/ai";
import { PostContext } from "./PostProvider";

function CommentCards() {
  const {selectedPost, setSelectedPost} = useContext(PostContext)
  const [isFollowed, setIsFollowed] = React.useState(false);
  return (
    <>
      {selectedPost &&
        selectedPost.comments.map((comment, index) => (
          <Card key={index} className="w-full rounded-none shadow-none border-1 border-gray-100">
            <CardHeader className="justify-between">
              <div className="flex gap-5">
                <Avatar
                  isBordered
                  radius="full"
                  size="md"
                  src={`http://127.0.0.1:8000${comment.user.image}`}
                />{" "}
                <div className="flex flex-col gap-1 items-start justify-center">
                  <h4 className="text-small font-semibold leading-none text-default-600">
                    {comment.user.full_name}
                  </h4>
                  <h5 className="text-small tracking-tight text-default-400">
                    @{comment.user.user.username}
                  </h5>
                </div>
              </div>
              <Button
                className={
                  isFollowed
                    ? "bg-black text-white border-default-200 "
                    : "bg-[#1D9BF0] text-white"
                }
                size="sm"
                variant={isFollowed ? "bordered" : "solid"}
                onPress={() => setIsFollowed(!isFollowed)}
              >
                {isFollowed ? "Unfollow" : "Follow"}
              </Button>
            </CardHeader>
            <div className="ml-14">
              <CardBody className="px-3 py-0 text-small text-black overflow-hidden">
                <p>{comment.body}</p>
                <span className="pt-2 text-default-400">
                  --- view more replies
                </span>
              </CardBody>
              <CardFooter className="gap-3">
                <div className="flex gap-1">
                  <p className="font-semibold text-default-400 text-small">
                    97.1K
                  </p>
                  <p className="text-default-400 text-small">Likes</p>
                  <AiOutlineLike />
                </div>
              </CardFooter>
            </div>
          </Card>
        ))}
    </>
  );
}

export default CommentCards;
