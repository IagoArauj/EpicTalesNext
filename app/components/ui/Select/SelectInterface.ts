import { SelectHTMLAttributes } from "react";

export default interface SelectInterface extends SelectHTMLAttributes<HTMLSelectElement> {
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  label?: string;
  id?: string;
  className?: string;
  options: { value: string; label: string }[];
  errors?: string;
  ref?: React.RefObject<HTMLSelectElement>;
  containerClassName?: string;
}