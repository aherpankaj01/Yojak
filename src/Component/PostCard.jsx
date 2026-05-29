import React, { useState } from "react";
import appwriteService from "../appwrite/config";
import { Link } from "react-router-dom";

const PostCard = ({ $id, title, featuredImage }) => {
  const [imgLoaded, setImgLoaded] = useState(false);
  const [imgError, setImgError] = useState(false);

  const imageUrl =
    featuredImage && !imgError
      ? appwriteService.getFilePreview(featuredImage, 400, 300)
      : "https://picsum.photos/400/300";

  return (
    <Link to={`/post/${$id}`} className="block group">
      <div className="w-full bg-white/10 rounded-xl overflow-hidden hover:scale-[1.03] hover:shadow-2xl hover:shadow-indigo-500/20 transition-all duration-300 border border-white/10">
        {/* Image container with fixed aspect ratio to prevent layout shift */}
        <div className="relative w-full" style={{ aspectRatio: "4/3" }}>
          {/* Skeleton shown while loading */}
          {!imgLoaded && (
            <div className="absolute inset-0 bg-white/5 animate-pulse" />
          )}
          <img
            src={imageUrl}
            alt={title || "Post image"}
            width={400}
            height={300}
            loading="lazy"
            decoding="async"
            onLoad={() => setImgLoaded(true)}
            onError={() => {
              setImgError(true);
              setImgLoaded(true);
            }}
            className={`w-full h-full object-cover transition-opacity duration-300 ${
              imgLoaded ? "opacity-100" : "opacity-0"
            }`}
          />
        </div>

        <div className="p-4">
          <h2 className="text-white font-semibold line-clamp-2 group-hover:text-indigo-300 transition-colors duration-200">
            {title || "Untitled"}
          </h2>
        </div>
      </div>
    </Link>
  );
};

export default PostCard;
