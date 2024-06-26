import React from "react";
import { useSelector } from "react-redux";
import { BiCheckDouble } from "react-icons/bi";
import { BsThreeDots } from "react-icons/bs";

function Message({ text, sent }) {
  const { image } = useSelector((state) => state.auth);

  return (
    <div className="flex flex-col mt-5">
      {sent ? (
        <div className="flex flex-col items-end mb-4">
          <div className="flex justify-end gap-5">
            <div className="ml-2 mt-8 gap-2 flex items-center ">
              <BiCheckDouble class="text-sm text-[#2eff3c]" />
              <h1 className="font-bold">Arfath</h1>
              <small className="mt-1">8:16 PM</small>
              <BsThreeDots className="text-[#424242]" />
            </div>
            <img
              src={`http://127.0.0.1:8000${image}`}
              className="object-cover h-8 mr-5 w-8 rounded-full mt-8"
              alt=""
            />
          </div>

          <div className="py-3 px-4 mr-[3.5rem] mt-4  bg-[#F8E8FF] rounded-bl-2xl rounded-tl-2xl rounded-br-xl text-[#424242]">
            {text.content}
          </div>
        </div>
      ) : (
        <div className="flex items-start mb-4">
          <div className="flex justify-end gap-5">
            <img
              src="https://source.unsplash.com/vpOeXr5wmR4/600x600"
              className="object-cover h-8 w-8 mt-3 ml-4 rounded-full mb-8"
              alt=""
            />
            <div className="flex flex-col justify-start gap-2">
              <div className="flex items-center mt-3 gap-2">
                <h1 className="font-bold">Arfath</h1>
                <small className="mt-1 ml-2">8:16 PM</small>
                <BsThreeDots className="text-[#424242]" />
              </div>
              <div className="py-2 px-3 mr-6 shadow-small rounded-br-3xl rounded-tr-3xl rounded-bl-xl text-[#424242]">
                {text.content}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Message;
