import React from "react";
import appwriteService from "../appwrite/config";
import { Link } from "react-router-dom";

const PostCard = ({ $id, title, featuredImage }) => {
  const imageUrl = featuredImage
    ? appwriteService.getFilePreview(featuredImage)
    : "https://picsum.photos/400/300";

  return (
    <Link to={`/post/${$id}`}>
      <div className="w-full bg-white/10 rounded-xl overflow-hidden hover:scale-105 transition">
        <img
          src={imageUrl}
          alt={title}
          loading="lazy"
          width={400}
          height={192}
          className="w-full h-48 object-cover"
          onError={(e) => {
            e.target.src = "https://picsum.photos/400/300";
          }}
        />
        <div className="p-4">
          <h2 className="text-white font-semibold line-clamp-2">
            {title || "Untitled"}
          </h2>
        </div>
      </div>
    </Link>
  );
};

export default PostCard;
