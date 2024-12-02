"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import TestimonialItem from "./TestimonialItem";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

export default function TestimonialSlider() {
  useGSAP(() => {
    gsap.from(".js-swiperSlide", {
      xPercent: -33,
      opacity: 0,
      stagger: 0.1,
      duration: 1,
      ease: "power4.out",
      scrollTrigger: {
        trigger: ".js-swiperSlide",
        start: "0% bottom",
        toggleActions: "play pause resume reset",
      },
    });
  });
  return (
    <Swiper className="" spaceBetween={32} slidesPerView={3.5}>
      <SwiperSlide className="js-swiperSlide">
        <TestimonialItem
          profileImagesrc="/images/index/Testimonials/FamBecker.jpg"
          name="Familie Becker"
          text="Dank HomeFinder haben wir endlich unser Traumhaus gefunden! Die Plattform war super einfach zu bedienen und hat genau auf unsere Wünsche zugeschnittene Angebote geliefert. Besonders begeistert hat uns die persönliche Begleitung: Von der ersten Anfrage bis zum Notartermin wurden wir durch jeden Schritt geführt und hatten immer einen Ansprechpartner. Der Kaufprozess war schnell, transparent und völlig stressfrei. Wir sind unglaublich dankbar!"
          location="Berlin, Germany"
        />
      </SwiperSlide>
      <SwiperSlide className="js-swiperSlide">
        <TestimonialItem
          profileImagesrc="/images/index/Testimonials/FamBecker.jpg"
          name="Familie Schmidt"
          text="HomeFinder hat uns perfekt unterstützt, unser neues Zuhause zu finden. Der Service war erstklassig, und wir fühlten uns während des gesamten Prozesses bestens betreut. Absolut empfehlenswert!"
          location="Hamburg, Germany"
        />
      </SwiperSlide>
      <SwiperSlide className="js-swiperSlide">
        <TestimonialItem
          profileImagesrc="/images/index/Testimonials/FamBecker.jpg"
          name="Familie Müller"
          text="Wir haben mit HomeFinder unsere Traumwohnung entdeckt. Der gesamte Prozess war unkompliziert und angenehm – von der Suche bis zum Vertragsabschluss war alles perfekt organisiert."
          location="München, Germany"
        />
      </SwiperSlide>
      <SwiperSlide className="js-swiperSlide">
        <TestimonialItem
          profileImagesrc="/images/index/Testimonials/FamBecker.jpg"
          name="Familie Klein"
          text="Dank der professionellen Unterstützung von HomeFinder haben wir endlich das ideale Zuhause für unsere Familie gefunden. Wir können HomeFinder nur weiterempfehlen!"
          location="Frankfurt, Germany"
        />
      </SwiperSlide>
      <SwiperSlide className="js-swiperSlide">
        <TestimonialItem
          profileImagesrc="/images/index/Testimonials/FamBecker.jpg"
          name="Familie Lehmann"
          text="Mit HomeFinder haben wir ein Haus gefunden, das wir uns nie hätten erträumen können. Der gesamte Ablauf war unkompliziert, und die Unterstützung durch das Team war hervorragend."
          location="Köln, Germany"
        />
      </SwiperSlide>
      <SwiperSlide className="js-swiperSlide">
        <TestimonialItem
          profileImagesrc="/images/index/Testimonials/FamBecker.jpg"
          name="Familie Meier"
          text="Wir waren beeindruckt von der großen Auswahl und der professionellen Begleitung. HomeFinder hat wirklich alle unsere Erwartungen übertroffen!"
          location="Stuttgart, Germany"
        />
      </SwiperSlide>
      <SwiperSlide className="js-swiperSlide">
        <TestimonialItem
          profileImagesrc="/images/index/Testimonials/FamBecker.jpg"
          name="Familie Weber"
          text="Unser neues Zuhause ist ein absoluter Traum, und HomeFinder hat uns den Weg dorthin so einfach wie möglich gemacht. Wir könnten nicht glücklicher sein!"
          location="Düsseldorf, Germany"
        />
      </SwiperSlide>
      <SwiperSlide className="js-swiperSlide">
        <TestimonialItem
          profileImagesrc="/images/index/Testimonials/FamBecker.jpg"
          name="Familie Schneider"
          text="Von Anfang bis Ende ein großartiger Service. HomeFinder hat uns nicht nur geholfen, unser Traumhaus zu finden, sondern auch dafür gesorgt, dass der gesamte Prozess stressfrei war."
          location="Leipzig, Germany"
        />
      </SwiperSlide>
    </Swiper>
  );
}
