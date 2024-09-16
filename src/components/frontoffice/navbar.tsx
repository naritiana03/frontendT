"use client";

import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import React, { useState } from "react";
import { ShoppingCartIcon, User, X } from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";
import AuthDialog from "./AuthDialog";
import { UserConnected } from "./UserConnected";
import useAuthStore from "@/store/authStore";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import useCartStore from "@/store/cart";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const NavBar = () => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const { isAuthenticated } = useAuthStore();
  const pathName = usePathname();
  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
  };

  const seeCard = () => {
    console.log("oo");
    router.push("/event/cart");
  };

  const { items } = useCartStore();

  return (
    <div className="navbar bg-[#242321] text-white flex items-center justify-between px-[6rem] py-4 custom-1100:px-[2rem]">
      <div className="left">
        <h1 className="font-MachinaBold">logo</h1>
      </div>
      <div className="right flex items-center gap-8 custom-900:hidden ">
        <div className="left">
          <ul className="uppercase font-MachinaBold  flex items-center gap-4">
            {navigation.map((item) => (
              <li key={item.id}>
                <Link
                  href={item.link}
                  className={cn(
                    pathName === item.link
                      ? " text-primary font-[800] "
                      : "text-white"
                  )}>
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="right flex items-center gap-8">
          <div
            className="panier relative cursor-pointer"
            onClick={() => seeCard()}>
            <ShoppingCartIcon size={24} />
            <span
              className={`w-[1.2rem] h-[1.2rem] absolute top-[-10px] right-[-7px] flex items-center justify-center ${
                items?.length === 0 ? "bg-gray-400" : "bg-red-600"
              }   rounded-full text-[10px]`}>
              <p>{items?.length}</p>
            </span>
          </div>
          <div className="sign">
            {isAuthenticated ? (
              <UserConnected />
            ) : (
              <Button
                className="flex items-center gap-2"
                onClick={() => setIsOpen(true)}>
                <User size={24} /> connexions
              </Button>
            )}
          </div>
        </div>
      </div>
      <div className="right-mobile hidden custom-900:flex custom-900:items-center custom-1000:gap-4 ">
        <div className="panier relative" onClick={() => seeCard()}>
          <ShoppingCartIcon size={24} />
          <span
            className={`w-[1.2rem] h-[1.2rem] absolute top-[-10px] right-[-7px] flex items-center justify-center ${
              items?.length === 0 ? "bg-gray-400" : "bg-red-600"
            }   rounded-full text-[10px]`}>
            <p>{items?.length}</p>
          </span>
        </div>

        <Sheet>
          <SheetTrigger asChild>
            <Menu />
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Menu</SheetTitle>
            </SheetHeader>
            <div className="mt-8">
              <ul className="uppercase font-MachinaBold  flex flex-col gap-4">
                {navigation.map((item) => (
                  <li key={item.id}>
                    <Link
                      href={item.link}
                      className={cn(
                        pathName === item.link
                          ? " text-primary font-[800] "
                          : "text-black"
                      )}>
                      {item.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <SheetFooter></SheetFooter>
          </SheetContent>
        </Sheet>
      </div>
      <AuthDialog isOpen={isOpen} onOpenChange={handleOpenChange} />
    </div>
  );
};

const navigation = [
  {
    id: 1,
    title: "accueil",
    link: "/",
  },
  {
    id: 2,
    title: "evenements",
    link: "/event",
  },
  {
    id: 3,
    title: "à propos",
    link: "/about",
  },
  {
    id: 4,
    title: "contact",
    link: "/contact",
  },
];

export default NavBar;
