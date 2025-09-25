import React from "react";

type TextProps = {
  children: React.ReactNode;
  className?: string;
};

export default function Text({ children, className = "" }: TextProps) {
  return <p className={`text-sm text-neutral-700 ${className}`}>{children}</p>;
}

