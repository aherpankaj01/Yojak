import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../../appwrite/config";
import { Button, Container } from "../../Component";
import parse from "html-react-parser";
import { useSelector } from "react-redux";

export default function Post() {
  const [post, setPost] = useState(null);
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
      <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white px-4">
        <p className="animate-pulse text-base sm:text-lg md:text-xl text-center">
          Loading post...
        </p>
      </div>
    );
  }

  return post ? (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white py-8 sm:py-10">
      <Container>
        <div className="relative w-full mb-6 sm:mb-8 rounded-xl overflow-hidden shadow-xl">
          {post.featuredImage && (
            <img
              src={appwriteService.getFileView(post.featuredImage)}
              alt={post.title}
              className="w-full h-60 sm:h-80 md:h-96 object-cover"
            />
          )}

          <div className="absolute inset-0 bg-black/40"></div>

          {isAuthor && (
            <div className="absolute top-4 right-4 flex gap-2 sm:gap-3">
              <Link to={`/edit-post/${post.$id}`}>
                <Button variant="secondary">Edit</Button>
              </Link>
              <Button variant="danger" onClick={deletePost}>
                Delete
              </Button>
            </div>
          )}
        </div>

        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6">
          {post.title}
        </h1>

        <div className="prose prose-invert max-w-none text-gray-300">
          {typeof post.content === "string" ? parse(post.content) : null}
        </div>
      </Container>
    </div>
  ) : null;
}
