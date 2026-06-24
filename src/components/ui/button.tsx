import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary";
type Size = "sm" | "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-btn font-medium transition-all duration-200 ease-brand focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring disabled:pointer-events-none disabled:opacity-50";

const variantStyles: Record<Variant, string> = {
  // master-plan §2.6
  primary:
    "bg-primary text-primary-foreground hover:bg-brand-blue-600 hover:-translate-y-0.5 hover:shadow-glow",
  secondary: "border border-border text-text hover:border-primary",
};

const sizeStyles: Record<Size, string> = {
  sm: "h-9 px-4 text-small",
  md: "h-11 px-5 text-body",
  lg: "h-12 px-7 text-body",
};

export function buttonVariants({
  variant = "primary",
  size = "md",
}: { variant?: Variant; size?: Size } = {}) {
  return cn(base, variantStyles[variant], sizeStyles[size]);
}

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
}

export function Button({ variant, size, className, ...props }: ButtonProps) {
  return (
    <button
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  );
}
