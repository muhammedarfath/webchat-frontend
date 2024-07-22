import React, { useRef, useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import { FaArrowRight } from "react-icons/fa";
import { IoIosImages } from "react-icons/io";
import { Textarea } from "@nextui-org/react";
import { Input } from "@nextui-org/react";
import axios from "axios";
import { Toaster, toast } from "react-hot-toast";
import { useSelector } from "react-redux";

function PostAddModal({ isOpen,onClose }) {
  const [caption, setCaption] = useState();
  const [tags, setTags] = useState();
  const [loading, setLoading] = useState(true);
  const [showMedia, setShowMedia] = useState(null);
  const fileInputRef = useRef(null);
  const [mediaType, setMediaType] = useState(null);
  const { username } = useSelector((state) => state.auth);

  const handlesubmit = async () => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("media_file", showMedia);
      formData.append("caption", caption);
      formData.append("tags", tags);
      const response = await axios.post(
        `http://127.0.0.1:8000/posts/add-post/${username}/`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response.status == 201) {
        onClose();
      } else {
        toast.error("somthing went wrong");
      }
    } catch (err) {
      toast.error("somthing went wrong", err);
    } finally {
      setLoading(false);
      setShowMedia(null);
      setMediaType(null);
      setCaption("");
      setTags("");
      onClose();
    }
  };
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setShowMedia(file);
    const extension = file.name.split(".").pop().toLowerCase();
    const isImage = ["jpg", "jpeg", "png", "gif", "bmp"].includes(extension);
    setMediaType(isImage ? "image" : "video");
  };
  const handleButtonClick = () => {
    fileInputRef.current.click();
  };
  const savePost = () => {
    return toast.promise(handlesubmit(), {
      loading: "Posting...",
      success: <b>Post added successfully!</b>,
      error: <b>Failed to add post.</b>,
    });
  };
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1 justify-center items-center">
          Create new post
        </ModalHeader>
        <ModalBody>
          <input
            type="file"
            accept="image/*,video/*"
            onChange={handleFileChange}
            ref={fileInputRef}
            style={{ display: "none" }}
          />

          {showMedia ? (
            <>
              {mediaType === "image" ? (
                <img
                  src={URL.createObjectURL(showMedia)}
                  alt="Selected Image"
                  className="mt-6 w-full h-80 object-contain rounded-lg"
                />
              ) : (
                <video
                  controls
                  className="mt-6 w-full h-80 object-contain rounded-lg"
                >
                  <source
                    src={URL.createObjectURL(showMedia)}
                    type="video/mp4"
                  />
                  Your browser does not support the video tag.
                </video>
              )}

              <ModalFooter className="flex flex-col gap-5">
                <Textarea
                  label="Write a caption..."
                  className="max-w-sm"
                  value={caption}
                  onChange={(e) => setCaption(e.target.value)}
                />
                <Input
                  type="text"
                  value={tags}
                  onChange={(e) => setTags(e.target.value)}
                  label="Tags (add tags, separated by commas)"
                />
                <Button
                  className="bg-gray-300 w-full hover:bg-gray-500"
                  onClick={savePost}
                >
                  Post
                  <FaArrowRight />
                </Button>
              </ModalFooter>
            </>
          ) : (
            <div className="flex flex-col justify-center items-center pb-6">
              <IoIosImages className="text-9xl" />
              <h1>Drag photos and videos here</h1>
              <Button
                onClick={handleButtonClick}
                className="bg-gray-300 mt-6 hover:bg-gray-500"
              >
                Select From Computer
              </Button>
            </div>
          )}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

export default PostAddModal;
