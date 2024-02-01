"use client";

import Image from "next/image";
import { useOrganizationList, useOrganization } from "@clerk/nextjs";

import { cn } from "@/lib/utils";
import { Hint } from "@/components/hint";

interface ItemProps {
  id: string;
  name: string;
  imageUrl: string;
}

export const Item = ({ id, name, imageUrl }: ItemProps) => {
  const { organization } = useOrganization();
  const { setActive } = useOrganizationList();
  const isActive = organization?.id === id;
  const onClick = () => {
    if (!setActive) return;

    setActive({ organization: id });
  };
  return (
    <div className="aspect-square relative">
      <Hint label={name} side="right" align="start" sideOffset={18}>
        <Image
          src={imageUrl}
          alt={name}
          onClick={onClick}
          fill
          className={cn(
            "rounded-full cursor-pointer opacity-60 hover:opacity-100 hover:scale-110 transition",
            isActive && "opacity-100 rounded-md",
          )}
        />
      </Hint>
    </div>
  );
};
