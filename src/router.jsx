import { lazy, Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";
import App from "./App";

// Styled full-screen loading fallback — prevents unstyled flash
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
    <div className="flex flex-col items-center gap-4">
      <div className="w-10 h-10 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin" />
      <p className="text-gray-400 text-sm animate-pulse">Loading...</p>
    </div>
  </div>
);

// Lazy imports
const Home = lazy(() => import("./Component/pages/Home.jsx"));
const AddPost = lazy(() => import("./Component/pages/AddPost.jsx"));
const Signup = lazy(() => import("./Component/pages/Signup.jsx"));
const EditPost = lazy(() => import("./Component/pages/EditPost.jsx"));
const Post = lazy(() => import("./Component/pages/Post.jsx"));
const AllPost = lazy(() => import("./Component/pages/AllPost.jsx"));
const AuthLayout = lazy(() => import("./Component/AuthLayout.jsx"));
const Login = lazy(() => import("./Component/Login.jsx"));

// Helper
const wrap = (element) => (
  <Suspense fallback={<PageLoader />}>{element}</Suspense>
);

const withAuth = (Component, auth) =>
  wrap(
    <AuthLayout authentication={auth}>
      <Component />
    </AuthLayout>,
  );

export const router = createBrowserRouter([
  {
    // App is NOT lazy — it's the shell, always loaded immediately
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: wrap(<Home />) },
      { path: "/login", element: withAuth(Login, false) },
      { path: "/signup", element: withAuth(Signup, false) },
      { path: "/all-posts", element: withAuth(AllPost, true) },
      { path: "/add-post", element: withAuth(AddPost, true) },
      { path: "/edit-post/:slug", element: withAuth(EditPost, true) },
      { path: "/post/:slug", element: wrap(<Post />) },
    ],
  },
]);
