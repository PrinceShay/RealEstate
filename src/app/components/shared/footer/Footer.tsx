"use client";
import React, { useRef } from "react";
import NewsletterForm from "./NewsletterForm";
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export default function Footer() {
  const LogoRef = useRef(null);
  const NewsletterRef = useRef(null);
  const FooterRef = useRef(null);

  useGSAP(
    () => {
      const footerAnim = gsap.timeline({
        scrollTrigger: {
          trigger: FooterRef.current,
          start: "0% bottom",
          toggleActions: "play pause resume reset",
        },
        delay: 0.25,
      });

      footerAnim.from(LogoRef.current, {
        yPercent: 100,
        ease: "power4.out",
        duration: "2",
      });

      footerAnim.from(
        NewsletterRef.current,
        {
          opacity: 0,
          yPercent: 15,
          ease: "power4.out",
          duration: "2",
        },
        "<"
      );

      const headlines = document.querySelectorAll(".js-footerHeadline");
      if (headlines.length > 0) {
        footerAnim.from(
          headlines,
          {
            opacity: 0,
            yPercent: -50,
            ease: "power4.out",
            stagger: 0.05,
            duration: "1.5",
          },
          "<20%"
        );
      }

      const linkWraps = document.querySelectorAll(".js-footerLinkWrap");
      if (linkWraps.length > 0) {
        footerAnim.from(
          linkWraps,
          {
            yPercent: 100,
            ease: "power4.inOut",
            stagger: 0.035,
            duration: "1.5",
          },
          "<"
        );
      }
    },
    { scope: FooterRef }
  );

  return (
    <footer ref={FooterRef} className="h-auto w-full pb-24 md:pb-4 p-4 sm:p-8">
      <div className="p-8 rounded-2xl min-h-[80dvh] sm:p-12 relative w-full h-full flex flex-col text-gray-lightest bg-gray-darkest bg-gradient-to-br from-gray-darkest to-gray-darker dark:from-gray-darker dark:to-gray-dark">
        <div className="flex flex-col lg:flex-row justify-between">
          <div className="overflow-hidden">
            <h1
              ref={LogoRef}
              className="text-[12vw] md:text-[7vw] mb-8 lg:mb-0"
            >
              HomeFinder
            </h1>
          </div>
          <div ref={NewsletterRef} className="max-w-3xl flex flex-col">
            <h1 className="text-4xl mb-6">Immer einen Schritt voraus</h1>
            <p className="text-md mb-10">
              Erhalte als Erster exklusive Updates zu neuen Immobilien,
              wertvolle News rund um den Immobilienmarkt und hilfreiche Tipps.
              Melde dich jetzt für unseren Newsletter an – kostenlos und
              unverbindlich!
            </p>
            <NewsletterForm />
          </div>
        </div>
        <div className="w-full h-[3px] bg-gray-dark dark:bg-gray-darker my-12"></div>
        <div className="w-full mb-12 flex justify-between flex-wrap gap-16">
          {/* Immobilien */}
          <div className="flex flex-col gap-2">
            <div className="overflow-hidden">
              <h1 className="js-footerHeadline text-md opacity-80 mb-6">
                Immobilien
              </h1>
            </div>
            <div className="overflow-hidden">
              <div className="js-footerLinkWrap">
                <Link
                  className="text-xl hover:text-mintGreen-light js-footerLink"
                  href="/kaufen"
                >
                  Kaufen
                </Link>
              </div>
            </div>
            <div className="overflow-hidden">
              <div className="js-footerLinkWrap">
                <Link
                  className="text-xl hover:text-mintGreen-light js-footerLink"
                  href="/verkaufen"
                >
                  Verkaufen
                </Link>
              </div>
            </div>
          </div>
          {/* Unternehmen */}
          <div className="flex flex-col gap-2">
            <div className="overflow-hidden">
              <h1 className="js-footerHeadline text-md opacity-80 mb-6">
                Unternehmen
              </h1>
            </div>
            <div className="overflow-hidden">
              <div className="js-footerLinkWrap">
                <Link
                  className="text-xl hover:text-mintGreen-light js-footerLink"
                  href="/unsere-mission"
                >
                  Unsere Mission
                </Link>
              </div>
            </div>
            <div className="overflow-hidden">
              <div className="js-footerLinkWrap">
                <Link
                  className="text-xl hover:text-mintGreen-light js-footerLink"
                  href="/team"
                >
                  Das Team
                </Link>
              </div>
            </div>
            <div className="overflow-hidden">
              <div className="js-footerLinkWrap">
                <Link className="text-xl js-footerLink" href="/karriere">
                  Karriere
                </Link>
              </div>
            </div>
            <div className="overflow-hidden">
              <div className="js-footerLinkWrap">
                <Link
                  className="text-xl hover:text-mintGreen-light js-footerLink"
                  href="/partnerunternehmen"
                >
                  Partnerunternehmen
                </Link>
              </div>
            </div>
            <div className="overflow-hidden">
              <div className="js-footerLinkWrap">
                <Link
                  className="text-xl hover:text-mintGreen-light js-footerLink"
                  href="/presse"
                >
                  Presse
                </Link>
              </div>
            </div>
          </div>
          {/* Ressourcen */}
          <div className="flex flex-col gap-2">
            <div className="overflow-hidden">
              <h1 className="js-footerHeadline text-md opacity-80 mb-6">
                Ressourcen
              </h1>
            </div>
            <div className="overflow-hidden">
              <div className="js-footerLinkWrap">
                <Link
                  className="text-xl hover:text-mintGreen-light js-footerLink"
                  href="/wissen"
                >
                  Wissen
                </Link>
              </div>
            </div>
            <div className="overflow-hidden">
              <div className="js-footerLinkWrap">
                <Link
                  className="text-xl hover:text-mintGreen-light js-footerLink"
                  href="/blog"
                >
                  Blog
                </Link>
              </div>
            </div>
            <div className="overflow-hidden">
              <div className="js-footerLinkWrap">
                <Link
                  className="text-xl hover:text-mintGreen-light js-footerLink"
                  href="/navblogcontent"
                >
                  NavBlogContent
                </Link>
              </div>
            </div>
            <div className="overflow-hidden">
              <div className="js-footerLinkWrap">
                <Link
                  className="text-xl hover:text-mintGreen-light js-footerLink"
                  href="/ratgeber"
                >
                  Ratgeber
                </Link>
              </div>
            </div>
            <div className="overflow-hidden">
              <div className="js-footerLinkWrap">
                <Link
                  className="text-x hover:text-mintGreen-light js-footerLink"
                  href="/faq"
                >
                  FAQ
                </Link>
              </div>
            </div>
          </div>
          {/* Kundenservice */}
          <div className="flex flex-col gap-2">
            <div className="overflow-hidden">
              <h1 className="js-footerHeadline text-md opacity-80 mb-6">
                Kundenservice
              </h1>
            </div>
            <div className="overflow-hidden">
              <div className="js-footerLinkWrap">
                <Link
                  className="text-xl hover:text-mintGreen-light js-footerLink"
                  href="/kontakt"
                >
                  Kontakt
                </Link>
              </div>
            </div>
            <div className="overflow-hidden">
              <div className="js-footerLinkWrap">
                <Link
                  className="text-xl hover:text-mintGreen-light js-footerLink"
                  href="/kundenstimmen"
                >
                  Kundenstimmen
                </Link>
              </div>
            </div>
            <div className="overflow-hidden">
              <div className="js-footerLinkWrap">
                <Link
                  className="text-xl hover:text-mintGreen-light js-footerLink"
                  href="/newsletter-anmeldung"
                >
                  Newsletter Anmeldung
                </Link>
              </div>
            </div>
          </div>
          {/* Rechtliches */}
          <div className="flex flex-col gap-2">
            <div className="overflow-hidden">
              <h1 className="js-footerHeadline text-md opacity-80 mb-6">
                Rechtliches
              </h1>
            </div>
            <div className="overflow-hidden">
              <div className="js-footerLinkWrap">
                <Link
                  className="text-xl hover:text-mintGreen-light js-footerLink"
                  href="/impressum"
                >
                  Impressum
                </Link>
              </div>
            </div>
            <div className="overflow-hidden">
              <div className="js-footerLinkWrap">
                <Link className="text-xl js-footerLink" href="/datenschutz">
                  Datenschutzerklärung
                </Link>
              </div>
            </div>
            <div className="overflow-hidden">
              <div className="js-footerLinkWrap">
                <Link
                  className="text-xl hover:text-mintGreen-light js-footerLink"
                  href="/agb"
                >
                  AGB
                </Link>
              </div>
            </div>
            <div className="overflow-hidden">
              <div className="js-footerLinkWrap">
                <Link
                  className="text-xl hover:text-mintGreen-light js-footerLink"
                  href="/cookie-richtlinie"
                >
                  Cookie-Richtlinie
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="text-center mt-auto text-sm opacity-50">
          © {new Date().getFullYear()} HomeFinder. Alle Rechte vorbehalten.
        </div>
      </div>
    </footer>
  );
}
