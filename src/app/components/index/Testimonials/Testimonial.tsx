import React from "react";
import TestimonialSlider from "./TestimonialSlider";

export default function Testimonial() {
  return (
    <section className=" bg-gray-darker text-gray-lightest py-48 pl-4 sm:pl-64">
      <div className=" mb-16">
        <p className="text-mintGreen-light dark:text-mintGreen-dark">
          Kundenmeinungen
        </p>
        <h1 className="text-4xl sm:text-5xl leading-tight">
          Glaube nicht nur uns –<br /> höre, was unsere Kunden sagen!
        </h1>
      </div>
      <TestimonialSlider />
    </section>
  );
}
