import React, { useEffect, useState } from "react";
import appwriteService from "../../appwrite/config";
import { Container, PostCard } from "../../Component";

function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    appwriteService
      .getPosts()
      .then((res) => {
        if (res) setPosts(res.documents);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white px-4">
        <p className="animate-pulse text-base sm:text-lg text-center">
          Loading posts...
        </p>
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white text-center px-4">
        <div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
            No posts available 🚀
          </h1>
          <p className="text-gray-400 text-sm sm:text-base">
            Login and create your first post!
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white py-6 sm:py-8 md:py-10 px-3 sm:px-4">
      <Container>
        <div className="mb-8 sm:mb-10 text-center">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-2 sm:mb-3">
            Explore Posts ✨
          </h1>
          <p className="text-gray-400 text-sm sm:text-base">
            Discover amazing content created by users
          </p>
        </div>

        <div className="grid gap-4 sm:gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {posts.map((post) => (
            <PostCard key={post.$id} {...post} />
          ))}
        </div>
      </Container>
    </div>
  );
}

export default Home;
