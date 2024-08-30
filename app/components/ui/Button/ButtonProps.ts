import { ButtonHTMLAttributes } from "react";

export default interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  type: "submit" | "button" | "reset";
  isLoading?: boolean;
  color?: "primary" | "primaryOutline" | "secondary" | "secondaryOutline" | "tertiary" | "gray" | "custom";
  className?: string;
  disabled?: boolean;
  xl?: boolean;
  loadingSpinnerClassName?: string;
}