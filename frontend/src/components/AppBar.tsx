import { Avatar } from "./BlogCard";
import { Link, useLocation } from "react-router-dom";
import React from "react";
import "../fonts/font.css"

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
        className="flex  justify-center flex-col  cursor-pointer"
      >
        <div className="greatvibes ">
            WordNest
        </div>
      </Link>
      <div className="flex items-center">
        {isPublishPage ? (
          // Only show Publish button in the /publish route
          <button
            onClick={onClick}
            className="mr-6 bg-green-500 text-white font-medium py-2 px-4 rounded-full transform hover:scale-105 transition-transform duration-200"
          >
            Publish
          </button>
        ) : (
          // Show Write Blog button that navigates to /publish
          <Link to="/publish">
            <button className="mr-6 text-slate-700 flex items-center font-medium py-1 px-3 text-md cursor-pointer rounded-full border border-slate-400 transform hover:scale-105 transition-transform duration-200">
               
            <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7" shape-rendering="geometricPrecision" text-rendering="geometricPrecision" image-rendering="optimizeQuality" fill-rule="evenodd" clip-rule="evenodd" viewBox="0 0 512 417.38">
           <path fill-rule="nonzero" d="M308.14 15.61c-3.85 4.75-6.2 10.19-7.32 15.8-1.54 7.75-.79 15.83 1.52 22.92 1.32 4.09-.91 8.48-5 9.81-.8.25-1.61.38-2.4.38l-229.87.01v309.02c.5 10.58 2.21 17.8 6.27 21.94 4.02 4.1 11.14 6 22.62 6.15l240.24-.03v-70.82c5.8-.39 11.19-2.55 15.58-5.98v22.73h43.34c4.22.03 7.69 3.41 7.77 7.64.45 22.7-2.44 38.67-11.56 49.04-9.2 10.44-23.6 14.41-45.79 12.82-.5.1-1.02.16-1.55.16l-248.19-.04c-15.9-.21-26.45-3.55-33.55-10.78-7.19-7.33-10.07-17.86-10.73-32.49l-.04-309.36H7.79c-4.3 0-7.79-3.49-7.79-7.79l.06-.97c.54-12.11 3.2-24.49 9.01-34.66l.28-.45C14.62 11.64 22.34 4.39 33.14.48c.87-.3 1.75-.45 2.62-.45L304.7 0l.79.04h.39c12.91.11 23.95 2.21 32.03 9.21 8.17 7.07 12.6 18.4 11.85 36.55l.01 61.75c-5.55 3.31-10.73 6.88-15.55 10.68l.01-72.77c.57-12.97-1.87-20.47-6.48-24.47-4.34-3.75-11.21-5.12-19.61-5.38zm-20.13 284.12c-6.28 19.68-15.42 38.63-16.89 57.91l10.89-1.83c13.2-51.75 26.05-86.86 56.43-131.93 22.77-33.79 48.27-61.27 81.94-84.2 17.93-12.21 41.05-25.87 62.48-30.58 5.85-1.29 11.85-2.01 18.03-2-65.84 20.83-116.06 60.74-154.15 117.54-15.54 23.15-28.63 48.55-40.39 75.15l25.88 2.58-11.04-4.42 37.5-9.14c-14.5-3.84-28.3-1.04-33.21-6.04 38.96-4.96 70.39-16.01 91.62-34.25-8.5-.49-18.26-.75-23.5-2.75 36.76-15.87 56.74-40.62 82.81-63.25-35.42 10.51-68.87 11.97-79.08 5.91 63.98-.47 103.65-21.39 114.11-66.87.82-4.89.77-9.74-.39-14.55-7.53-31.27-64.49-37.41-80.62-9.93-3.23 5.5-7.99 10.67-11.76 17.04l14.72-34c-45.46 19.6-47.89 37.33-67.81 91.75.62-16.12 3.86-30.94 8.52-45.06-56.58 27.3-71.42 85.64-70.6 134.16-3.06-16.7-1.67-38.11 2.41-62.36-15.65 18.48-25.62 39.48-19.15 67.78l-8.1-2.85 5.35 15.03-12.12-4.58 16.12 25.74zM119.1 312.3c-4.24 0-7.68-3.47-7.68-7.76 0-4.28 3.44-7.75 7.68-7.75h98.66c4.23 0 7.67 3.47 7.67 7.75 0 4.29-3.44 7.76-7.67 7.76H119.1zm0-47.12c-4.24 0-7.68-3.47-7.68-7.76 0-4.28 3.44-7.75 7.68-7.75h127.08c4.24 0 7.68 3.47 7.68 7.75 0 4.29-3.44 7.76-7.68 7.76H119.1zm-2.94-47.12c-4.46 0-8.09-3.48-8.09-7.77 0-4.28 3.63-7.76 8.09-7.76h150.77c4.46 0 8.09 3.48 8.09 7.76 0 4.29-3.63 7.77-8.09 7.77H116.16zm2.7-47.19c-4.3 0-7.79-3.45-7.79-7.7 0-4.26 3.49-7.71 7.79-7.71h161.17c4.3 0 7.79 3.45 7.79 7.71 0 4.25-3.49 7.7-7.79 7.7H118.86zm.24-47.02c-4.31 0-7.8-3.5-7.8-7.8s3.49-7.79 7.8-7.79h161.16c4.3 0 7.8 3.49 7.8 7.79s-3.5 7.8-7.8 7.8H119.1zm230.68 239.28v38.64c13.93.41 22.78-2.07 27.85-7.84 5.3-6.02 7.47-16.2 7.74-30.8h-35.59zM285.54 28.37c.87-4.37 2.27-8.67 4.28-12.78H37.13c-6.36 2.63-11.03 7.21-14.34 12.86l-.21.39c-3.35 5.87-5.35 12.86-6.34 20.1h268.9c-1.01-6.69-.96-13.72.4-20.57z"/>
             </svg>&nbsp;Write
              
            </button>
          </Link>
        )}
        <Avatar size="big" name="krrish" />
      </div>
    </div>
  );
};