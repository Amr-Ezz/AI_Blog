import React, { useState } from "react";

interface BlogPostCard {
  title: string;
  content: string;
  date: string;
  onDelete: () => void;
}
const BlogCard: React.FC<BlogPostCard> = ({
  title,
  content,
  date,
  onDelete,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const toggleExpansion = () => {
    setIsExpanded(!isExpanded);
  };
  return (
    <div className="bg-[#27293d] p-6 rounded-lg shadow-[0_4px_15px_rgba(0,0,0,0.2)] flex flex-col justify-between">
      <h3 className="mt-0 text-[#00c6ff]">{title}</h3>
      <p className="text-sm text-gray-400 mb-2">
        <span className="text-gray-400 text-xs">{date}</span>
      </p>
      <p
        className={`text-sm mb-4 flex-grow ${
          isExpanded
            ? ""
            : "max-h-[100px] overflow-hidden text-ellipsis line-clamp-3"
        } `}
      >
        {content}
      </p>
      <div className="mt-auto">
        <button
          className="mr-2 px-4 py-2 text-sm bg-[#00c6ff] text-[#1e1e2f] rounded-md cursor-pointer font-bold transition duration-300 ease-in-out hover:bg-blue-400 hover:scale-105 inline-block no-underline"
          onClick={toggleExpansion}
        >
          {isExpanded ? "Show Less" : "Read More"}
        </button>
        <button
          className="px-4 py-2 text-sm bg-red-600 text-white rounded-md cursor-pointer font-bold transition duration-300 ease-in-out hover:bg-red-700 hover:scale-105 inline-block no-underline"
          onClick={onDelete}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default BlogCard;
