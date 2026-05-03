import React, { useEffect, useState } from "react";
import { Container, PostForm } from "../../Component";
import appwriteService from "../../appwrite/config";
import { useNavigate, useParams } from "react-router-dom";

function EditPost() {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  const { slug } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (!slug) {
      navigate("/");
      return;
    }

    appwriteService
      .getPost(slug)
      .then((res) => {
        if (res) setPost(res);
        else navigate("/");
      })
      .catch(() => navigate("/"))
      .finally(() => setLoading(false));
  }, [slug, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white px-4">
        <p className="animate-pulse text-base sm:text-lg text-center">
          Loading post...
        </p>
      </div>
    );
  }

  return post ? (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 py-6 sm:py-8 md:py-10 px-3 sm:px-4">
      <Container>
        <div className="mb-6 sm:mb-8 text-center text-white">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold">
            Edit Post ✏️
          </h1>
          <p className="text-gray-400 text-sm sm:text-base">
            Update your content easily
          </p>
        </div>

        <div className="backdrop-blur-lg bg-white/10 border border-white/20 rounded-xl sm:rounded-2xl shadow-2xl p-4 sm:p-6 md:p-10">
          <PostForm post={post} />
        </div>
      </Container>
    </div>
  ) : null;
}

export default EditPost;
