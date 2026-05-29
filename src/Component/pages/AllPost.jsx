import React, { useEffect, useState } from "react";
import { Container, PostCard } from "../../Component";
import appwriteService from "../../appwrite/config";

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

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 text-white py-10">
        <Container>
          <h1 className="text-3xl font-bold mb-6">All Posts</h1>
          <div className="grid md:grid-cols-3 gap-5">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="w-full bg-white/10 rounded-xl overflow-hidden animate-pulse"
              >
                <div className="w-full h-48 bg-white/20" />
                <div className="p-4">
                  <div className="h-4 bg-white/20 rounded w-3/4" />
                </div>
              </div>
            ))}
          </div>
        </Container>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white py-10">
      <Container>
        <h1 className="text-3xl font-bold mb-6">All Posts</h1>

        {posts.length === 0 ? (
          <p>No posts found</p>
        ) : (
          <div className="grid md:grid-cols-3 gap-5">
            {posts.map((post) => (
              <PostCard key={post.$id} {...post} />
            ))}
          </div>
        )}
      </Container>
    </div>
  );
}

export default AllPosts;
