import Image from "next/image";
import React, { useState } from "react";
import {
  CalendarIcon,
  EmojiHappyIcon,
  LocationMarkerIcon,
  PhotographIcon,
  SearchCircleIcon,
} from "@heroicons/react/outline";

const TweetBox = () => {
  const [input, setInput] = useState("");

  return (
    <div className="flex space-x-2 p-5">
      <Image
        className="object-cover rounded-full mt-4 h-14 w-14"
        src="https://links.papareact.com/gll"
        alt="user_img"
        width={56}
        height={56}
      />

      <div className="flex flex-1 items-center pl-2">
        <form className="flex flex-1 flex-col" action="">
          <input
            className="h-24 w-full text-xl outline-none placeholder:text-xl"
            type="text"
            placeholder="What's happening?"
            value={input}
            onChange={(event) => setInput(event.target.value)}
          />
          <div className="flex items-center">
            <div className="flex flex-1 space-x-2 text-twitter">
              <PhotographIcon className="h-5 w-5 cursor-pointer transition-transform duration-150 ease-out hover:scale-150" />
              <SearchCircleIcon className="h-5 w-5 cursor-pointer transition-transform duration-150 ease-out hover:scale-150" />
              <EmojiHappyIcon className="h-5 w-5 cursor-pointer transition-transform duration-150 ease-out hover:scale-150" />
              <CalendarIcon className="h-5 w-5 cursor-pointer transition-transform duration-150 ease-out hover:scale-150" />
              <LocationMarkerIcon className="h-5 w-5 cursor-pointer transition-transform duration-150 ease-out hover:scale-150" />
            </div>
            <button
              disabled={!input}
              className="bg-twitter px-5 py-2 font-bold text-white rounded-full disabled:opacity-40"
            >
              Tweet
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TweetBox;
