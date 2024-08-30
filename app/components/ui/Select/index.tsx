"use client";

import SelectInterface from "./SelectInterface";

export default function Select({
  value,
  onChange,
  label = "",
  id,
  className,
  ref,
  errors,
  options,
  containerClassName,
  ...props
}: SelectInterface) {
  return (
    <div className={`flex flex-col ${containerClassName}`}>
      <label htmlFor={id} className="select-none">
        {label}
      </label>
      <select
        value={value}
        onChange={onChange}
        id={id}
        className={`px-4 py-2 border border-gray-300 rounded-lg focus:shadow-[0px_3px_10px_1px_rgba(0,0,0,0.3)] ${className}`}
        ref={ref}
        {...props}
      >
        <option value="" disabled>
          Select an option
        </option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {errors && <span className="text-red-700">{errors}</span>}
    </div>
  );
}