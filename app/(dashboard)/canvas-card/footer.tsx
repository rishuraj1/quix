"use client";

import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface FooterProps {
  isFavourite: boolean;
  authorLabel: string;
  createdAtLabel: string;
  title: string;
  onClick: () => void;
  disabled: boolean;
}

export const Footer = ({
  isFavourite,
  authorLabel,
  createdAtLabel,
  title,
  onClick,
  disabled,
}: FooterProps) => {
  const handleClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    event.stopPropagation();
    event.preventDefault();
    onClick();
  };

  return (
    <div className="relative bg-white p-3">
      <p className="text-[13px] truncate max-w-[calc(100%-20px)]">{title}</p>
      <p className="lg:opacity-0 group-hover:opacity-100 transition-opacity text-[11px] text-muted-foreground truncate">
        {authorLabel}, {createdAtLabel}
      </p>
      <button
        onClick={handleClick}
        disabled={disabled}
        className={cn(
          "lg:opacity-0 group-hover:opacity-100 transition-opacity absolute top-3 right-3 hover:text-amber-600",
          disabled && "cursor-not-allowed opacity-75",
        )}
      >
        <Star
          className={cn(
            "w-5 h-5 transition",
            isFavourite ? "text-amber-400 fill-amber-400" : "",
          )}
        />
      </button>
    </div>
  );
};
