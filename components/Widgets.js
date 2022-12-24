import { SearchIcon } from "@heroicons/react/outline";
import React from "react";
import { TwitterTimelineEmbed } from "react-twitter-embed";

const Widgets = () => {
  return (
    <div className="px-2 mt-2 col-span-2 hidden lg:inline space-y-2">
      {/* Search Bar */}
      <div className="flex items-center mt-2 space-x-2 bg-gray-100 p-3 rounded-full">
        <SearchIcon className="h-5 w-5 text-gray-400" />
        <input
          type="text"
          placeholder="Search Twitter..."
          className="flex-1 bg-transparent outline-none"
        />
      </div>

      <TwitterTimelineEmbed
        sourceType="profile"
        screenName="elonmusk"
        options={{ height: 1000 }}
        noHeader="false"
      />
    </div>
  );
};

export default Widgets;
