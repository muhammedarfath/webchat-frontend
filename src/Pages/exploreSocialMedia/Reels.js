import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { FaRegHeart } from "react-icons/fa";
import { TbMessageCircle } from "react-icons/tb";
import { VscLiveShare } from "react-icons/vsc";
import { MdSaveAlt } from "react-icons/md";
import Avatar_profile from "../../Components/avatar/Avatar_profile";
import {Card, Skeleton} from "@nextui-org/react";
import { BsThreeDots } from "react-icons/bs";

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";

export function Reels() {
  const [loading, setLoading] = useState(true);
  const { username } = useParams();
  const [posts,setPost] = useState([])
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedPost, setSelectedPost] = useState(null);



  useEffect(() => {
    setLoading(true);
    const fetchPosts = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/posts/posts/${username}/`
        );

        if (response.data) {
          setPost(response.data)
        }
      } catch (error) {
        console.error("errr", error);
      }
      setLoading(false);
    };

    fetchPosts();
  }, [username]);


   console.log(posts);


  if (loading) {
    return (
      <div className="h-screen overflow-auto relative bg-white w-full">
      <div className="columns-2 xl:columns-4 p-4 gap-4 space-y-4">
        {[...Array(8)].map((_, index) => (
          <Card key={index} className="w-full h-auto rounded-3xl">
            <Skeleton className="rounded-lg">
              <div className="rounded-lg bg-default-300"
              style={{height:`${Math.random()*300 + 300}px`}}
              ></div>
            </Skeleton>
          </Card>
        ))}
      </div>
    </div>
    )
  }

  const handleOpen = (post) => {
    setSelectedPost(post)
    onOpen();
  };

  return (
    <div className="h-screen overflow-auto relative bg-white w-full">
    <div className="columns-2 xl:columns-4 p-4 gap-4 space-y-4">
      {posts.map((post, index) => (
        <>
        <div key={index} className="relative group cursor-pointer" onClick={() => handleOpen(post)}>
          <img
            src={`http://127.0.0.1:8000${post.picture}`}
            alt={`Image ${index + 1}`}
            className="w-full h-auto rounded-3xl"
          />
          <div className="absolute bottom-0 text-white font-semibold left-0 rounded-3xl w-full h-full bg-black bg-opacity-30 flex items-end justify-between pr-6 pb-7 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="ml-4">
              <div className="flex gap-3 ">
                <Avatar_profile/>
                <h1>{post.user.username}</h1>
              </div>
              <span className="ml-6">{post.caption}</span>
              <div className="mt-2">
                    {post.tags.map((tag) => (
                      <a key={tag.id} className="mr-2">#{tag.title}</a>
                    ))}
              </div>
            </div>
            <div className="flex flex-col items-center gap-4">
              <FaRegHeart className="text-white font-bold text-2xl cursor-pointer"/>
              <TbMessageCircle className="text-white font-bold text-2xl cursor-pointer"/>
              <VscLiveShare className="text-white font-bold text-2xl cursor-pointer"/>
              <MdSaveAlt className="text-white font-bold text-2xl cursor-pointer"/>
            </div>
          </div>

        </div>
        {selectedPost && (
        <Modal isOpen={isOpen} onClose={onClose} className="flex h-full lg:h-auto xl:auto md:h-auto sm:h-auto" size="3xl">
          <ModalContent className="flex flex-row">
            <div>
              <img
                src={`http://127.0.0.1:8000${selectedPost.picture}`}
                alt="Selected"
                className="w-full lg:h-auto h-full rounded-lg"
              />
            </div>
            <div className="lg:block md:block sm:block hidden  gap-5 pt-7 pl-2 mt-4">
                <div className="flex gap-x-64"> 
                  <div className="flex gap-2">
                  <Avatar_profile/>
                  <h1>arfath</h1>
                  </div>
                  <BsThreeDots className="mr-3"/>
                </div>
                <hr className="w-full mt-2"/>
                {selectedPost.caption ? <div className="h-96">
                  <div className="flex gap-3">
                  <Avatar_profile/>
                  <h5>{selectedPost.caption}</h5>
                  </div>
                  
                  <div className="mt-2">
                    {selectedPost.tags.map((tag) => (
                      <a key={tag.id} className="mr-2">#{tag.title}</a>
                    ))}
                  </div>
                </div> : (
                  <div className="flex justify-center items-center h-96">
                  <h5>No Comment Yet</h5>
                </div>
                )}

                <hr className="w-full mt-28"/>

                <div className="absolute bottom-5 gap-x-64 flex justify-between">
                  <div className="flex gap-4 pl-3">
                  <FaRegHeart className="text-black font-bold text-2xl cursor-pointer"/>
                  <VscLiveShare className="text-black font-bold text-2xl cursor-pointer"/>
                  </div>
                  <div className="flex">
                  <MdSaveAlt className="text-black font-bold text-2xl cursor-pointer"/>
                  </div>
                </div>
            </div>
          </ModalContent>
        </Modal>
      )}
        </>
      ))}
    </div>
  </div>

  );
}
