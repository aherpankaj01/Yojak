import { Editor } from "@tinymce/tinymce-react";
import { Controller } from "react-hook-form";

export default function RTE({ name, control, label, defaultValue = "" }) {
  return (
    <div className="w-full flex flex-col gap-2 sm:gap-3">
      {label && (
        <label className="text-xs sm:text-sm font-medium text-gray-300">
          {label}
        </label>
      )}

      <div className="rounded-lg sm:rounded-xl overflow-hidden border border-white/20 bg-white/10 backdrop-blur-md shadow-lg">
        <Controller
          name={name || "content"}
          control={control}
          defaultValue={defaultValue}
          render={({ field: { onChange, value } }) => (
            <Editor
              apiKey="fpdgef84ivel97dybscctbz7g84etaelqqfzjphikio55k0n"
              value={value}
              onEditorChange={onChange}
              init={{
                height: window.innerWidth < 640 ? 300 : 400,
                menubar: false,
                plugins: [
                  "advlist",
                  "autolink",
                  "lists",
                  "link",
                  "image",
                  "charmap",
                  "preview",
                  "searchreplace",
                  "visualblocks",
                  "code",
                  "fullscreen",
                  "insertdatetime",
                  "media",
                  "table",
                  "help",
                  "wordcount",
                ],
                toolbar:
                  window.innerWidth < 640
                    ? "undo redo | bold italic | bullist numlist | link"
                    : "undo redo | blocks | bold italic underline | forecolor backcolor | alignleft aligncenter alignright alignjustify | bullist numlist | link image media | code fullscreen",
                skin: "oxide-dark",
                content_css: "dark",
                content_style:
                  "body { font-family:Inter, sans-serif; font-size:14px; background:#111827; color:#fff }",
                branding: false,
              }}
            />
          )}
        />
      </div>
    </div>
  );
}
