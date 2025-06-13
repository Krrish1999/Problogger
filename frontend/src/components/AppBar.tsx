import { Avatar } from "./BlogCard";
import { Link, useLocation } from "react-router-dom";
import React from "react";

interface AppBarProps {
  onClick?: () => void;
}

export const AppBar: React.FC<AppBarProps> = ({ onClick }) => {
  const location = useLocation();
  const isPublishPage = location.pathname === "/publish";

  return (
    <div className="border-slate-200 border-b px-10 py-4 flex justify-between">
      <Link
        to="/blogs"
        className="flex justify-center flex-col font-medium text-lg cursor-pointer"
      >
        Medium
      </Link>
      <div className="flex items-center">
        {isPublishPage ? (
          // Only show Publish button in the /publish route
          <button
            onClick={onClick}
            className="mr-6 bg-green-500 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-full"
          >
            Publish
          </button>
        ) : (
          // Show Write Blog button that navigates to /publish
          <Link to="/publish">
            <button className="mr-6 bg-green-500 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-full">
              Write Blog
            </button>
          </Link>
        )}
        <Avatar size="big" name="krrish" />
      </div>
    </div>
  );
};