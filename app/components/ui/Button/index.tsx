import { ButtonHTMLAttributes } from "react";
import LoadingSpinner from "../LoadingSpinner";
import ButtonProps from "./ButtonProps";

export default function Button({
  children,
  type = "button",
  isLoading = false,
  color = "primary",
  className = "",
  disabled = false,
  xl = false,
  loadingSpinnerClassName = "",
  ...props
}: ButtonProps) {
  const colors = {
    primary: "bg-red-700 enabled:hover:bg-red-800 text-white",
    primaryOutline:
      "border border-red-700 text-red-700 hover:bg-red-700 hover:text-white",
    secondary: "bg-amber-500 enabled:hover:bg-amber-700 text-white",
    secondaryOutline:
      "border border-amber-500 text-amber-500 hover:bg-amber-500 hover:text-white",
    tertiary: "bg-rose-500 enabled:hover:bg-rose-700 text-white",
    gray: "bg-gray-500 enabled:hover:bg-gray-700 text-white",
    custom: "",
  };

  className = `${colors[color]} ${
    xl ? "font-bold text-xl" : ""
  } flex items-center justify-center px-4 py-2 rounded-lg transition disabled:opacity-75 enabled:hover:shadow-[0px_3px_10px_1px_rgba(0,0,0,0.3)] ${className}`;

  return (
    <button
      type={type}
      className={className}
      disabled={isLoading || disabled}
      {...props}
    >
      {isLoading ? <LoadingSpinner className={`text-white ${loadingSpinnerClassName}`} /> : null} {children}
    </button>
  );
}
