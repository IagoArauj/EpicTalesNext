"use client";

import TextBoxInterface from "./TextBoxInterface";

export default function TextBox({
  value,
  onChange,
  label = "",
  placeholder = "",
  id,
  className,
  ref,
  errors,
  rows,
  ...props
}: TextBoxInterface) {
  return (
    <div className="flex flex-col">
      <label htmlFor={id} className="select-none">
        {label}
      </label>
      <textarea
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        id={id}
        className={`px-4 py-2 border border-gray-300 rounded-lg focus:shadow-[0px_3px_10px_1px_rgba(0,0,0,0.3)] ${className}`}
        ref={ref}
        rows={rows || 3}
        {...props}
      />
      {errors && <span className="text-red-700">{errors}</span>}
    </div>
  );
}
