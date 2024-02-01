"use client";

import Link from "next/link";
import Image from "next/image";
import { Poppins } from "next/font/google";
import { LayoutDashboard, Star } from "lucide-react";
import { useSearchParams } from "next/navigation";

import { cn } from "@/lib/utils";
import { OrganizationSwitcher } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";

const font = Poppins({
  subsets: ["latin"],
  weight: ["600"],
});

export const OrgSidebar = () => {
  const searchParams = useSearchParams();
  const favourites = searchParams.get("favourites");

  return (
    <div className="hidden lg:flex flex-col space-y-6 w-[200px] pl-5 pt-5">
      <Link href="/">
        <div className="flex items-center gap-x-2">
          <Image src={"/logo.svg"} alt="logo" height={60} width={60} />
          <span className={cn("text-2xl font-semibold", font.className)}>
            Quix
          </span>
        </div>
      </Link>
      <OrganizationSwitcher
        hidePersonal
        appearance={{
          elements: {
            rootBox: {
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
            },
            organizationSwitcherTrigger: {
              width: "100%",
              padding: "6px",
              borderRadius: "8px",
              border: "1px solid #E5E7EB",
              justifyContent: "space-between",
              backgroundColor: "#FFF",
            },
          },
        }}
      />
      <div className="space-y-1 w-full">
        <Button
          asChild
          size={"lg"}
          className={cn(
            "font-normal justify-start px-2 w-full hover:bg-stone-200 transition",
            favourites ? "" : "bg-stone-200 hover:bg-stone-300 transition",
          )}
          variant={favourites ? "ghost" : "secondary"}
        >
          <Link href="/">
            <LayoutDashboard
              className={cn(
                "h-4 w-4 mr-2",
                favourites ? "" : "text-blue-800 fill-blue-800",
              )}
            />
            Team Canvas
          </Link>
        </Button>
        <Button
          asChild
          size={"lg"}
          className={cn(
            "font-normal justify-start px-2 w-full hover:bg-stone-200 transition",
            favourites ? "bg-stone-200 hover:bg-stone-300 transition" : "",
          )}
          variant={favourites ? "secondary" : "ghost"}
        >
          <Link
            href={{
              href: "/",
              query: { favourites: true },
            }}
          >
            <Star
              className={cn(
                "h-4 w-4 mr-2",
                favourites ? "text-yellow-400 fill-yellow-400" : "",
              )}
            />
            Favourites
          </Link>
        </Button>
      </div>
    </div>
  );
};
