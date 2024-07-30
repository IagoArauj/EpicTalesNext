import { ChangeEventHandler } from "react";

export default interface InputProps {
  value: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  label: string;
  type: "text" | "password" | "email" | "number" | "hidden";
  placeholder?: string;
  id?: string;
  className?: string;
  ref?: React.RefObject<HTMLInputElement>;
  errors?: string;
}