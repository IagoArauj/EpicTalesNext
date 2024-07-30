import { useEffect } from "react";
import InputProps from "./InputProps";

export default function Input({
  value,
  onChange,
  label,
  type,
  placeholder = "",
  id,
  className,
  ref,
  errors,
}: InputProps) {
  useEffect(() => {
    console.log("errors: ", errors);
  }, [errors]);
  return (
    <div className="flex flex-col">
      <label htmlFor={id} className="select-none">
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        id={id}
        className={`px-4 py-2 border border-gray-300 rounded-lg focus:shadow-[0px_3px_10px_1px_rgba(0,0,0,0.3)] ${className}`}
        ref={ref}
      />
      {errors && <span className="text-red-700">{errors}</span>}
    </div>
  );
}
