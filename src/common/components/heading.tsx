import React from "react";
import { ElementType } from "react";

type HeadingProps = {
  children: React.ReactNode;
  className?: string;
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  id?: string;
};

export default function Heading({ children, className = "", level = 2, id }: HeadingProps) {
  const Tag = (`h${level}`) as ElementType;
  const sizes: Record<number, string> = {
    1: "text-3xl md:text-4xl font-bold",
    2: "text-2xl md:text-3xl font-semibold",
    3: "text-xl md:text-2xl font-semibold",
    4: "text-lg md:text-xl font-medium",
    5: "text-base md:text-lg font-medium",
    6: "text-sm md:text-base font-medium",
  };
  return <Tag id={id} className={`${sizes[level]} ${className}`}>{children}</Tag>;
}
