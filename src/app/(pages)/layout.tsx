import type { Metadata } from "next";
import "../globals.css";
import MobileNav from "../components/shared/navbar/MobileNav";
import Footer from "../components/shared/footer/Footer";
import { Toaster } from "@/components/ui/toaster";
import NavbarAlt from "../components/shared/navbar/NavbarAlt";

export const metadata: Metadata = {
  title: "HomeFinder – Ihr Immobilienmakler in Deutschland",
  description:
    "Finden Sie Ihr Traumhaus mit HomeFinder. Professionelle Unterstützung beim Kauf, Verkauf und der Vermietung von Immobilien in ganz Deutschland.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de">
      <body
        className={`antialiased  dark:bg-gray-darkest dark:text-gray-lightest transition-colors`}
      >
        <NavbarAlt />
        <MobileNav />
        <main>{children}</main>
        <Toaster />
        <Footer />
      </body>
    </html>
  );
}
