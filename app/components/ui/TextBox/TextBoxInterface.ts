import { TextareaHTMLAttributes } from "react";

export default interface TextBoxInterface extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  label?: string;
  placeholder?: string;
  id?: string;
  className?: string;
  ref?: React.RefObject<HTMLTextAreaElement>;
  errors?: string;
}