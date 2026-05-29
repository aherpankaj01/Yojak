import { lazy, Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";
import App from "./App";

// Lazy imports
const Home = lazy(() => import("./Component/pages/Home.jsx"));
const AddPost = lazy(() => import("./Component/pages/AddPost.jsx"));
const Signup = lazy(() => import("./Component/pages/Signup.jsx"));
const EditPost = lazy(() => import("./Component/pages/EditPost.jsx"));
const Post = lazy(() => import("./Component/pages/Post.jsx"));
const AllPost = lazy(() => import("./Component/pages/AllPost.jsx"));

const AuthLayout = lazy(() => import("./Component/AuthLayout.jsx"));
const Login = lazy(() => import("./Component/Login.jsx"));

const withSuspense = (Component) => (
  <Suspense
    fallback={
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <div className="w-8 h-8 border-4 border-white/20 border-t-white rounded-full animate-spin" />
      </div>
    }
  >
    <Component />
  </Suspense>
);

export const router = createBrowserRouter([
  {
    path: "/",
    // App is the layout shell — never wrap it in Suspense/lazy
    element: <App />,
    children: [
      { path: "/", element: withSuspense(Home) },

      {
        path: "/login",
        element: (
          <Suspense
            fallback={
              <div className="min-h-screen flex items-center justify-center bg-gray-900">
                <div className="w-8 h-8 border-4 border-white/20 border-t-white rounded-full animate-spin" />
              </div>
            }
          >
            <AuthLayout authentication={false}>
              <Login />
            </AuthLayout>
          </Suspense>
        ),
      },

      {
        path: "/signup",
        element: (
          <Suspense
            fallback={
              <div className="min-h-screen flex items-center justify-center bg-gray-900">
                <div className="w-8 h-8 border-4 border-white/20 border-t-white rounded-full animate-spin" />
              </div>
            }
          >
            <AuthLayout authentication={false}>
              <Signup />
            </AuthLayout>
          </Suspense>
        ),
      },

      {
        path: "/all-posts",
        element: (
          <Suspense
            fallback={
              <div className="min-h-screen flex items-center justify-center bg-gray-900">
                <div className="w-8 h-8 border-4 border-white/20 border-t-white rounded-full animate-spin" />
              </div>
            }
          >
            <AuthLayout authentication>
              <AllPost />
            </AuthLayout>
          </Suspense>
        ),
      },

      {
        path: "/add-post",
        element: (
          <Suspense
            fallback={
              <div className="min-h-screen flex items-center justify-center bg-gray-900">
                <div className="w-8 h-8 border-4 border-white/20 border-t-white rounded-full animate-spin" />
              </div>
            }
          >
            <AuthLayout authentication>
              <AddPost />
            </AuthLayout>
          </Suspense>
        ),
      },

      {
        path: "/edit-post/:slug",
        element: (
          <Suspense
            fallback={
              <div className="min-h-screen flex items-center justify-center bg-gray-900">
                <div className="w-8 h-8 border-4 border-white/20 border-t-white rounded-full animate-spin" />
              </div>
            }
          >
            <AuthLayout authentication>
              <EditPost />
            </AuthLayout>
          </Suspense>
        ),
      },

      { path: "/post/:slug", element: withSuspense(Post) },
    ],
  },
]);
