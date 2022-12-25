import Image from "next/image";
import React, { useRef, useState } from "react";
import {
  CalendarIcon,
  EmojiHappyIcon,
  LocationMarkerIcon,
  PhotographIcon,
  SearchCircleIcon,
  XCircleIcon,
  XIcon,
} from "@heroicons/react/outline";
import { useSession } from "next-auth/react";
import { fetchTweets } from "../utils/fetchTweets";
import toast from "react-hot-toast";

const TweetBox = ({ setTweets }) => {
  const [input, setInput] = useState("");
  const [image, setImage] = useState("");
  const [imgUrl, setImgUrl] = useState(false);

  const selectedImageRef = useRef(null);
  const imageURLInputRef = useRef(null);

  const { data: session } = useSession();

  const addImageToTweet = (event) => {
    event.preventDefault();

    if (!imageURLInputRef.current?.value) return;

    setImage(imageURLInputRef.current.value);
    imageURLInputRef.current.value = "";
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

  const onSelectImage = async (event) => {
    setImage(URL.createObjectURL(event.target.files[0]));
    setImgUrl(false);
  };

  return (
    <div className="flex space-x-2 p-5 relative">
      <img
        className="object-cover rounded-full mt-4 h-14 w-14"
        src={session?.user?.image || "https://links.papareact.com/gll"}
        alt="user_img"
      />

      <div className="flex flex-1 items-center pl-2">
        <form className="flex flex-1 flex-col" action="">
          <input
            className="h-24 w-full mb-2 text-xl p-3 outline-none placeholder:text-base placeholder:md:text-xl disabled:rounded-xl"
            type="text"
            placeholder={session ? "What's happening?" : "Sign In To Tweet..."}
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
              disabled={!input || !session || !image}
              className="bg-twitter px-5 py-2 font-bold text-white rounded-full disabled:opacity-40"
            >
              Tweet
            </button>
          </div>

          {imgUrl && (
            <form
              className="flex flex-col mt-5 rounded-lg bg-twitter/80 py-2 px-4 items-center"
              action=""
            >
              <div className="w-full flex justify-between">
                <input
                  ref={imageURLInputRef}
                  className="bg-transparent flex-1 pr-2 text-white outline-none placeholder:text-white"
                  type="text"
                  placeholder="Enter Image URL..."
                />
                <button
                  type="submit"
                  onClick={addImageToTweet}
                  className="rounded-full text-white font-bold border px-2"
                >
                  Add Image
                </button>
              </div>
              <p className="text-white mb-2">or</p>

              {/* Select image input */}
              <input
                type="file"
                accept="image/*"
                ref={selectedImageRef}
                onChange={(event) => onSelectImage(event)}
                style={{ display: "none" }}
              />
              <button
                className="rounded-full text-white font-bold border px-2"
                onClick={(event) => {
                  event.preventDefault();
                  selectedImageRef.current.click();
                }}
              >
                Choose a Picture
              </button>
            </form>
          )}

          {image && (
            <div className="relative">
              <img
                className="mt-10 h-40 w-full rounded-xl object-contain shadow-lg"
                src={image}
                alt=""
              />
              <XIcon
                className="absolute text-white top-2 right-2 h-6 w-6 cursor-pointer bg-twitter/50 rounded-full transition-transform duration-150 ease-out hover:scale-110"
                onClick={() => setImage("")}
              />
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default TweetBox;
