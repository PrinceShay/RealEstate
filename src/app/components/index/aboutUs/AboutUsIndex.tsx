import React from "react";
import SecondaryButton from "../../shared/ui/SecondaryButton";

export default function AboutUsIndex() {
  return (
    <section className="px-4 sm:px-16 max-w-[1600px] mx-auto py-24 grid grid-cols-1 gap-12 sm:grid-cols-12  border-t border-gray-dark dark:border-gray-light">
      <div className="col-span-6">
        <p className="text-mintGreen-light dark:text-mintGreen-dark">
          Über uns
        </p>
        <h1 className="text-4xl sm:text-5xl leading-tight">Was uns ausmacht</h1>
      </div>
      <div className="col-span-6 text-lg">
        <div className="mb-4">
          <p className="">
            Hey! Wir sind das Team von HomeFinder – junge, motivierte
            Immobilienexperten, die wissen, was du brauchst. Mit frischem Blick
            und viel Leidenschaft begleiten wir dich vom ersten Klick bis zum
            Einzug.
            <p className="mt-6">
              Deine Zufriedenheit ist unser Antrieb! Wir setzen auf persönliche
              Betreuung und nutzen moderne Technologien, um deine
              Immobiliensuche easy zu gestalten. Dank unserer lokalen Expertise
              und einem starken Netzwerk finden wir immer die besten Angebote
              für dich. Transparenz und Nachhaltigkeit stehen bei uns an erster
              Stelle – so findest du nicht nur ein Zuhause, sondern das richtige
              Zuhause.
            </p>
          </p>
        </div>
        <SecondaryButton title="Mehr erfahren" link="/" />
      </div>
    </section>
  );
}
