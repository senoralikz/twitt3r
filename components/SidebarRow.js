import React from "react";

const SidebarRow = ({ Icon, title, onClick }) => {
  return (
    <div
      onClick={() => onClick?.()}
      className="flex max-w-fit items-center space-x-2 px-4 py-3 rounded-full hover:bg-gray-100 cursor-pointer transition-all duration-200 group"
    >
      <Icon className="h-6 w-6" />
      <p className="hidden md:inline-flex text-base font-light lg:text-xl group-hover:text-twitter">
        {title}
      </p>
    </div>
  );
};

export default SidebarRow;
