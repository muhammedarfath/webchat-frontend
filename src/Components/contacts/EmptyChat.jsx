import React from "react";

function EmptyChat() {
  return (
    <div className="hidden lg:block rounded-lg bg-white h-full">
      <div className="rounded-lg bg-white h-screen flex flex-col justify-center items-center">
        <img src="images/chatimage.png" alt="image" />
        <div className="mt-4 text-center">
          <h1 className="text-xl font-bold">Select Message</h1>
          <p className="text-sm text-gray-500">
            To see your existing conversation or share a link below to start new
          </p>
        </div>
      </div>
    </div>
  );
}

export default EmptyChat;
