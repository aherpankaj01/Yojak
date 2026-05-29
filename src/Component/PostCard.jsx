import appwriteService from "../appwrite/config";
import { Link } from "react-router-dom";
const PostCard = ({ $id, title, featuredImage }) => {
  const imageUrl = featuredImage
    ? appwriteService.getFilePreview(featuredImage, 400, 250)
    : "https://picsum.photos/400/250";
  return (
    <Link to={`/post/${$id}`}>
      {" "}
      <div className="w-full bg-white/10 rounded-xl overflow-hidden transition duration-300 hover:scale-[1.02] flex flex-col h-full">
        {" "}
        <div className="w-full h-48 overflow-hidden">
          {" "}
          <img
            src={imageUrl}
            alt={title}
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.src = "https://picsum.photos/400/250";
            }}
          />{" "}
        </div>{" "}
        <div className="p-4 flex-grow">
          {" "}
          <h2 className="text-white font-semibold line-clamp-2">
            {" "}
            {title || "Untitled"}{" "}
          </h2>{" "}
        </div>{" "}
      </div>{" "}
    </Link>
  );
};
export default PostCard;
