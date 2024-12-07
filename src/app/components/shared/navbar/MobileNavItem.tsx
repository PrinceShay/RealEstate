import Link from "next/link";
import React, { ReactElement } from "react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import ThemeToggle from "./ThemeToggle";
import FavoriteButton from "./FavoriteButton";

type Props = {
  title: string;
  link?: string; // Optional gemacht
  icon: ReactElement<any>;
};

export default function MobileNavItem({ title, link, icon }: Props) {
  return (
    (<Drawer>
      {link ? (
        // Wenn ein Link vorhanden ist, als normaler Link rendern
        (<Link
          href={link}
          className="h-full w-full flex flex-col justify-center gap-[2px] items-center text-xs p-4 active:bg-gradient-to-t from-gray-lightest to-gray-lighter dark:from-gray-dark dark:to-gray-darker"
        >
          {icon}
          {title}
        </Link>)
      ) : (
        // Wenn kein Link vorhanden ist, DrawerTrigger verwenden
        (<DrawerTrigger className="h-full w-full flex flex-col justify-center gap-[2px] items-center text-xs p-4 active:bg-gray-lightest dark:active:bg-gray-darker">
          {icon}
          {title}
        </DrawerTrigger>)
      )}
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Einstellungen</DrawerTitle>
          <DrawerDescription>
            Hier findest du verschiedene Einstellungen
          </DrawerDescription>
        </DrawerHeader>
        <div className="w-full flex flex-row justify-center gap-4 items-center">
          <div className="flex flex-col justify-center items-center text-sm">
            <ThemeToggle />
            Farbmodus
          </div>
          <div className="flex flex-col justify-center items-center text-sm">
            <FavoriteButton />
            Favoriten
          </div>
        </div>

        <DrawerFooter>
          <DrawerClose>
            <Button variant="outline">Fertig</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>)
  );
}
