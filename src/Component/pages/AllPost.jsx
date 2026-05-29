import React, { useEffect, useState } from "react";
import { Container, PostCard } from "../../Component";
import appwriteService from "../../appwrite/config";

function AllPosts() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    appwriteService.getPosts().then((res) => {
      if (res) setPosts(res.documents);
    });
  }, []);

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
