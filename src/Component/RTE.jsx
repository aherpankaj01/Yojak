import React, { lazy, Suspense } from "react";
import { Controller } from "react-hook-form";
const TinyMCEEditor = lazy(() =>
  import("@tinymce/tinymce-react").then((module) => ({
    default: module.Editor,
  })),
);
export default function RTE({ name, control, label, defaultValue = "" }) {
  return (
    <div className="w-full flex flex-col gap-2 sm:gap-3">
      {" "}
      {label && (
        <label className="text-xs sm:text-sm font-medium text-gray-300">
          {" "}
          {label}{" "}
        </label>
      )}{" "}
      <div className="rounded-lg sm:rounded-xl overflow-hidden border border-white/20 bg-white/10 backdrop-blur-md shadow-lg">
        {" "}
        <Controller
          name={name || "content"}
          control={control}
          defaultValue={defaultValue}
          render={({ field: { onChange, value } }) => (
            <Suspense
              fallback={
                <div className="p-4 text-white"> Loading editor... </div>
              }
            >
              {" "}
              <TinyMCEEditor
                apiKey="YOUR_API_KEY"
                value={value}
                onEditorChange={onChange}
                init={{
                  height: window.innerWidth < 640 ? 300 : 400,
                  menubar: false,
                  plugins: ["lists", "link", "code"],
                  toolbar:
                    window.innerWidth < 640
                      ? "undo redo | bold italic | bullist"
                      : "undo redo | bold italic underline | bullist numlist | link | code",
                  skin: "oxide-dark",
                  content_css: "dark",
                  branding: false,
                }}
              />{" "}
            </Suspense>
          )}
        />{" "}
      </div>{" "}
    </div>
  );
}
