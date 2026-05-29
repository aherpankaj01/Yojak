import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../../appwrite/config";
import { Button, Container } from "../../Component";
import parse from "html-react-parser";
import { useSelector } from "react-redux";

export default function Post() {
  const [post, setPost] = useState(null);
  const [imgLoaded, setImgLoaded] = useState(false);
  const [loading, setLoading] = useState(true);

  const { slug } = useParams();
  const navigate = useNavigate();

  const userData = useSelector((state) => state.auth.userData);
  const isAuthor = post && userData ? post.userId === userData.$id : false;

  useEffect(() => {
    if (!slug) {
      navigate("/");
      return;
    }

    appwriteService
      .getPost(slug)
      .then((post) => {
        if (post) setPost(post);
        else navigate("/");
      })
      .catch(() => navigate("/"))
      .finally(() => setLoading(false));
  }, [slug, navigate]);

  const deletePost = async () => {
    if (!window.confirm("Delete this post?")) return;
    const status = await appwriteService.deletePost(post.$id);
    if (status) {
      await appwriteService.deleteFile(post.featuredImage);
      navigate("/");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 py-8 sm:py-10">
        <Container>
          {/* Skeleton layout */}
          <div
            className="w-full mb-6 sm:mb-8 rounded-xl overflow-hidden bg-white/5 animate-pulse"
            style={{ height: "24rem" }}
          />
          <div className="h-8 bg-white/5 animate-pulse rounded-lg w-3/4 mb-4" />
          <div className="space-y-3">
            <div className="h-4 bg-white/5 animate-pulse rounded w-full" />
            <div className="h-4 bg-white/5 animate-pulse rounded w-5/6" />
            <div className="h-4 bg-white/5 animate-pulse rounded w-4/6" />
          </div>
        </Container>
      </div>
    );
  }

  if (!post) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white py-8 sm:py-10">
      <Container>
        {post.featuredImage && (
          <div className="relative w-full mb-6 sm:mb-8 rounded-xl overflow-hidden shadow-xl bg-white/5">
            {/* Skeleton while full image loads */}
            {!imgLoaded && (
              <div className="w-full h-60 sm:h-80 md:h-96 animate-pulse bg-white/10" />
            )}
            <img
              src={appwriteService.getFileView(post.featuredImage)}
              alt={post.title}
              loading="eager"
              decoding="async"
              onLoad={() => setImgLoaded(true)}
              className={`w-full h-60 sm:h-80 md:h-96 object-cover transition-opacity duration-500 ${
                imgLoaded ? "opacity-100" : "opacity-0 absolute inset-0"
              }`}
            />

            <div className="absolute inset-0 bg-black/40 pointer-events-none" />

            {isAuthor && (
              <div className="absolute top-4 right-4 flex gap-2 sm:gap-3 z-10">
                <Link to={`/edit-post/${post.$id}`}>
                  <Button variant="secondary">Edit</Button>
                </Link>
                <Button variant="danger" onClick={deletePost}>
                  Delete
                </Button>
              </div>
            )}
          </div>
        )}

        {/* Show author buttons even when no image */}
        {!post.featuredImage && isAuthor && (
          <div className="flex gap-2 sm:gap-3 mb-6 justify-end">
            <Link to={`/edit-post/${post.$id}`}>
              <Button variant="secondary">Edit</Button>
            </Link>
            <Button variant="danger" onClick={deletePost}>
              Delete
            </Button>
          </div>
        )}

        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6">
          {post.title}
        </h1>

        <div className="prose prose-invert max-w-none text-gray-300">
          {typeof post.content === "string" ? parse(post.content) : null}
        </div>
      </Container>
    </div>
  );
}
