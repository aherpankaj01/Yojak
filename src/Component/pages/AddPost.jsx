import React from "react";
import { Container, PostForm } from "../../Component";

function AddPost() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 py-6 sm:py-8 md:py-10 px-3 sm:px-4">
      <Container>
        <div className="mb-6 sm:mb-8 text-center text-white">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold">
            Create New Post ✍️
          </h1>
          <p className="text-gray-400 text-sm sm:text-base">
            Share your thoughts with the world
          </p>
        </div>

        <div className="backdrop-blur-lg bg-white/10 border border-white/20 rounded-xl sm:rounded-2xl shadow-2xl p-4 sm:p-6 md:p-10">
          <PostForm />
        </div>
      </Container>
    </div>
  );
}

export default AddPost;
