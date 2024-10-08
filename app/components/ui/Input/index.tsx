import InputProps from "./InputProps";

export default function Input({
  value,
  onChange,
  label = "",
  type,
  placeholder = "",
  id,
  className,
  ref,
  errors,
  containerClassName = "",
  ...props
}: InputProps) {
  return (
    <div className={`flex flex-col ${containerClassName}`}>
      <label htmlFor={id} className="select-none">
        {label}
      </label>

      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        id={id}
        className={`px-4 py-2 border border-gray-300 rounded-lg focus:shadow-[0px_3px_10px_1px_rgba(0,0,0,0.3)] ${props.readOnly ? 'cursor-not-allowed opacity-75' : 'cursor-text'} ${className}`}
        ref={ref}
        {...props}
      />
      {errors && <span className="text-red-700">{errors}</span>}
    </div>
  );
}
