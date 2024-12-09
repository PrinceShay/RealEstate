"use client";
import { Heart } from "lucide-react";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

import React, { useEffect, useState } from "react";
import EstateItemList from "../../immobilienList/Item/EstateItemList";

export default function FavoriteButton() {
  const [savedEstates, setSavedEstates] = useState([]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedItems = JSON.parse(
        localStorage.getItem("savedEstates") || "[]"
      );
      setSavedEstates(savedItems);
    }
  }, [setSavedEstates]);

  return (
    <>
      <Drawer>
        <DrawerTrigger>
          <div className="hover:bg-gray-lighter text-gray-darkest dark:hover:bg-gray-darker dark:text-gray-lightest rounded-full h-full aspect-square p-4">
            <div className="relative">
              {savedEstates.length > 0 ? (
                <div className="absolute aspect-square w-4 h-4 flex items-center justify-center text-[9px] bg-mintGreen-light dark:text-gray-darkest -right-2 -top-1 rounded-full font-semibold">
                  {savedEstates.length}
                </div>
              ) : null}
              <Heart strokeWidth={1.5} />
            </div>
          </div>
        </DrawerTrigger>

        <DrawerContent className="pb-12">
          <DrawerHeader className="px-16 max-w-[1200px] w-full mx-auto">
            <DrawerTitle className="">Ihre Favoriten</DrawerTitle>
            <DrawerDescription>
              Hier sind Ihre gespeicherten Favoriten.
            </DrawerDescription>
          </DrawerHeader>
          <div className="w-full px-16 max-w-[1200px] mx-auto overflow-y-auto max-h-[40vh] flex flex-col gap-4">
            {savedEstates.length > 0 ? (
              savedEstates.map((estate, index) => (
                <EstateItemList
                  layout="horizontal"
                  key={index}
                  estate={estate}
                />
              ))
            ) : (
              <p className="text-gray-dark dark:text-gray-light">
                Sie haben noch keine Favoriten gespeichert.
              </p>
            )}
          </div>
        </DrawerContent>
      </Drawer>
    </>
  );
}
