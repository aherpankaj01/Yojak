export default function Button({
  children,
  type = "button",
  variant = "primary",
  className = "",
  loading = false,
  disabled = false,
  ...props
}) {
  const baseStyle =
    "px-4 sm:px-5 py-2 sm:py-2.5 text-sm sm:text-base rounded-md sm:rounded-lg font-medium transition-all duration-300 flex items-center justify-center gap-2";

  const variants = {
    primary:
      "bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-md hover:scale-[1.02] sm:hover:scale-105 hover:shadow-lg sm:hover:shadow-xl",

    secondary: "bg-gray-700 text-white hover:bg-gray-600",

    danger:
      "bg-gradient-to-r from-red-500 to-pink-500 text-white hover:scale-[1.02] sm:hover:scale-105",

    outline: "border border-white/30 text-white hover:bg-white/10",
  };

  return (
    <button
      type={type}
      disabled={disabled || loading}
      className={`
        w-full sm:w-auto
        ${baseStyle}
        ${variants[variant]}
        ${disabled || loading ? "opacity-50 cursor-not-allowed" : ""}
        ${className}
      `}
      {...props}
    >
      {loading && (
        <span className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></span>
      )}
      {children}
    </button>
  );
}
