import React, { useEffect, useState } from "react";
import { Container, PostCard } from "../../Component";
import appwriteService from "../../appwrite/config";

const SkeletonCard = () => (
  <div className="w-full bg-white/5 rounded-xl overflow-hidden animate-pulse border border-white/5">
    <div className="w-full bg-white/10" style={{ aspectRatio: "4/3" }} />
    <div className="p-4 space-y-2">
      <div className="h-4 bg-white/10 rounded w-3/4" />
      <div className="h-4 bg-white/10 rounded w-1/2" />
    </div>
  </div>
);

function AllPosts() {
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white py-6 sm:py-8 md:py-10 px-3 sm:px-4">
      <Container>
        <div className="mb-8 sm:mb-10 text-center">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2">
            All Posts
          </h1>
          <p className="text-gray-400 text-sm sm:text-base">
            Everything published on Yojak
          </p>
        </div>

        {!loading && posts.length === 0 ? (
          <p className="text-center text-gray-400">No posts found</p>
        ) : (
          <div className="grid gap-4 sm:gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {loading
              ? Array.from({ length: 8 }).map((_, i) => (
                  <SkeletonCard key={i} />
                ))
              : posts.map((post) => <PostCard key={post.$id} {...post} />)}
          </div>
        )}
      </Container>
    </div>
  );
}

export default AllPosts;
