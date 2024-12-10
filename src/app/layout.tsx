import type { Metadata } from "next";
import "./globals.css";

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
        {children}
      </body>
    </html>
  );
}
