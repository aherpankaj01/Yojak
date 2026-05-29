import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../../appwrite/config";
import { Button, Container } from "../../Component";
import parse, { domToReact } from "html-react-parser";
import { useSelector } from "react-redux";

const parseOptions = {
  replace(domNode) {
    if (domNode.type !== "tag") return;

    const children = domToReact(domNode.children, parseOptions);

    switch (domNode.name) {
      case "h1":
        return (
          <h1 className="text-3xl sm:text-4xl font-bold text-white mt-8 mb-4 leading-tight border-b border-white/10 pb-3">
            {children}
          </h1>
        );
      case "h2":
        return (
          <h2 className="text-2xl sm:text-3xl font-bold text-white mt-8 mb-3 leading-tight">
            {children}
          </h2>
        );
      case "h3":
        return (
          <h3 className="text-xl sm:text-2xl font-semibold text-white mt-6 mb-2">
            {children}
          </h3>
        );
      case "h4":
        return (
          <h4 className="text-lg font-semibold text-gray-200 mt-5 mb-2">
            {children}
          </h4>
        );
      case "p":
        return (
          <p className="text-gray-300 leading-8 mb-5 text-base sm:text-lg">
            {children}
          </p>
        );
      case "strong":
      case "b":
        return <strong className="text-white font-semibold">{children}</strong>;
      case "em":
      case "i":
        return <em className="text-gray-200 italic">{children}</em>;
      case "u":
        return (
          <u className="text-gray-200 underline decoration-gray-400">
            {children}
          </u>
        );
      case "a":
        return (
          <a
            href={domNode.attribs?.href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:text-blue-300 underline underline-offset-2 transition-colors"
          >
            {children}
          </a>
        );
      case "ul":
        return (
          <ul className="list-disc list-outside pl-6 mb-5 space-y-2 text-gray-300">
            {children}
          </ul>
        );
      case "ol":
        return (
          <ol className="list-decimal list-outside pl-6 mb-5 space-y-2 text-gray-300">
            {children}
          </ol>
        );
      case "li":
        return (
          <li className="text-gray-300 leading-7 text-base sm:text-lg">
            {children}
          </li>
        );
      case "blockquote":
        return (
          <blockquote className="border-l-4 border-blue-500 pl-5 py-1 my-6 bg-white/5 rounded-r-lg italic text-gray-300 text-lg">
            {children}
          </blockquote>
        );
      case "code":
        return (
          <code className="bg-gray-800 text-green-400 px-2 py-0.5 rounded text-sm font-mono">
            {children}
          </code>
        );
      case "pre":
        return (
          <pre className="bg-gray-900 border border-white/10 rounded-xl p-5 my-6 overflow-x-auto text-sm font-mono text-green-400 leading-6">
            {children}
          </pre>
        );
      case "img":
        return (
          <img
            src={domNode.attribs?.src}
            alt={domNode.attribs?.alt || ""}
            className="rounded-xl w-full my-6 shadow-lg"
          />
        );
      case "hr":
        return <hr className="border-white/10 my-8" />;
      case "br":
        return <br />;
      default:
        return;
    }
  },
};

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
      <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
        <p className="animate-pulse text-lg">Loading post...</p>
      </div>
    );
  }

  return post ? (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white py-8 sm:py-12">
      <Container>
        {post.featuredImage && (
          <div className="relative w-full mb-8 rounded-2xl overflow-hidden shadow-2xl">
            <img
              src={appwriteService.getFileView(post.featuredImage)}
              alt={post.title}
              className="w-full h-64 sm:h-80 md:h-[28rem] object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-transparent to-transparent" />

            {isAuthor && (
              <div className="absolute top-4 right-4 flex gap-2">
                <Link to={`/edit-post/${post.$id}`}>
                  <button className="bg-white/20 hover:bg-white/30 backdrop-blur text-white text-sm font-medium px-4 py-2 rounded-lg transition">
                    ✏️ Edit
                  </button>
                </Link>
                <button
                  onClick={deletePost}
                  className="bg-red-500/80 hover:bg-red-600 backdrop-blur text-white text-sm font-medium px-4 py-2 rounded-lg transition"
                >
                  🗑️ Delete
                </button>
              </div>
            )}
          </div>
        )}

        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
            {post.title}
          </h1>

          <hr className="border-white/10 mb-8" />

          <div className="text-gray-300">
            {typeof post.content === "string"
              ? parse(post.content, parseOptions)
              : null}
          </div>
        </div>
      </Container>
    </div>
  ) : null;
}
