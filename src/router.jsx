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

// Wrapper (no repetition)
const withSuspense = (Component) => (
  <Suspense fallback={<div>Loading...</div>}>
    <Component />
  </Suspense>
);

export const router = createBrowserRouter([
  {
    path: "/",
    element: withSuspense(App),
    children: [
      { path: "/", element: withSuspense(Home) },

      {
        path: "/login",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <AuthLayout authentication={false}>
              <Login />
            </AuthLayout>
          </Suspense>
        ),
      },

      {
        path: "/signup",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <AuthLayout authentication={false}>
              <Signup />
            </AuthLayout>
          </Suspense>
        ),
      },

      {
        path: "/all-posts",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <AuthLayout authentication>
              <AllPost />
            </AuthLayout>
          </Suspense>
        ),
      },

      {
        path: "/add-post",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <AuthLayout authentication>
              <AddPost />
            </AuthLayout>
          </Suspense>
        ),
      },

      {
        path: "/edit-post/:slug",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
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
