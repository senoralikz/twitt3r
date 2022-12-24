import Image from "next/image";
import React, { useRef, useState } from "react";
import {
  CalendarIcon,
  EmojiHappyIcon,
  LocationMarkerIcon,
  PhotographIcon,
  SearchCircleIcon,
} from "@heroicons/react/outline";
import { useSession } from "next-auth/react";
import { fetchTweets } from "../utils/fetchTweets";
import toast from "react-hot-toast";

const TweetBox = ({ setTweets }) => {
  const [input, setInput] = useState("");
  const [image, setImage] = useState("");
  const [imgUrl, setImgUrl] = useState(false);

  const imageInputRef = useRef(null);
  const { data: session } = useSession();

  const addImageToTweet = (event) => {
    event.preventDefault();

    if (!imageInputRef.current?.value) return;

    setImage(imageInputRef.current.value);
    imageInputRef.current.value = "";
    setImgUrl(false);
  };

  const postTweet = async () => {
    const tweetInfo = {
      text: input,
      username: session?.user?.name || "Unknown User",
      profileImg: session?.user?.image || "https://links.papareact.com/gll",
      image: image,
    };

    const result = await fetch(`/api/addTweet`, {
      body: JSON.stringify(tweetInfo),
      method: "POST",
    });

    const json = await result.json();

    const newTweets = await fetchTweets();
    setTweets(newTweets);

    toast("Tweet Posted", {
      icon: "🚀",
    });

    return json;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    postTweet();

    setInput("");
    setImage("");
    setImgUrl(false);
  };

  return (
    <div className="flex space-x-2 p-5 relative">
      {/* {!session && (
        <div className="absolute w-fit p-3 px-8 bg-blue-200 border-2 border-blue-300 rounded-md top-10 left-60">
          <p>Please Sign In To Tweet</p>
        </div>
      )} */}
      <img
        className="object-cover rounded-full mt-4 h-14 w-14"
        src={session?.user?.image || "https://links.papareact.com/gll"}
        alt="user_img"
      />
      {/* <Image
        className="object-cover rounded-full mt-4 h-14 w-14"
        src={session?.user?.image || "https://links.papareact.com/gll"}
        alt="user_img"
        width={56}
        height={56}
      /> */}

      <div className="flex flex-1 items-center pl-2">
        <form className="flex flex-1 flex-col" action="">
          <input
            className="h-24 w-full mb-2 text-xl p-3 outline-none placeholder:text-base placeholder:md:text-xl disabled:rounded-xl"
            type="text"
            placeholder={
              session
                ? "What's happening?"
                : "Sign In To Share Your Thoughts..."
            }
            value={input}
            onChange={(event) => setInput(event.target.value)}
            disabled={!session}
          />
          <div className="flex items-center">
            <div className="flex flex-1 space-x-2 text-twitter">
              <PhotographIcon
                className="h-5 w-5 cursor-pointer transition-transform duration-150 ease-out hover:scale-150"
                onClick={() => setImgUrl(!imgUrl)}
              />
              <SearchCircleIcon className="h-5 w-5 cursor-pointer transition-transform duration-150 ease-out hover:scale-150" />
              <EmojiHappyIcon className="h-5 w-5 cursor-pointer transition-transform duration-150 ease-out hover:scale-150" />
              <CalendarIcon className="h-5 w-5 cursor-pointer transition-transform duration-150 ease-out hover:scale-150" />
              <LocationMarkerIcon className="h-5 w-5 cursor-pointer transition-transform duration-150 ease-out hover:scale-150" />
            </div>
            <button
              onClick={handleSubmit}
              disabled={!input || !session}
              className="bg-twitter px-5 py-2 font-bold text-white rounded-full disabled:opacity-40"
            >
              Tweet
            </button>
          </div>

          {imgUrl && (
            <form
              className="mt-5 flex rounded-lg bg-twitter/80 py-2 px-4"
              action=""
            >
              <input
                ref={imageInputRef}
                className="flex-1 bg-transparent p-2 text-white outline-none placeholder:text-white"
                type="text"
                placeholder="Enter Image URL..."
              />
              <button
                type="submit"
                onClick={addImageToTweet}
                className="font-bold text-white"
              >
                Add Image
              </button>
            </form>
          )}

          {image && (
            <img
              className="mt-10 h-40 w-full rounded-xl object-contain shadow-lg"
              src={image}
              alt=""
            />
          )}
        </form>
      </div>
    </div>
  );
};

export default TweetBox;
