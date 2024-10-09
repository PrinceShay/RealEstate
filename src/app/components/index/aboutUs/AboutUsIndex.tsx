import React from "react";
import SecondaryButton from "../../shared/ui/SecondaryButton";

export default function AboutUsIndex() {
  return (
    <section className="px-16 max-w-[1600px] mx-auto py-24 grid grid-cols-12 border-t border-gray-dark dark:border-gray-light">
      <div className="col-span-6">
        <p className="text-mintGreen-light dark:text-mintGreen-dark">
          Über uns
        </p>
        <h1 className="Headline-md ">Was uns ausmacht</h1>
      </div>
      <div className="col-span-6 text-lg">
        <p className="mb-4">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero
          maiores officia cum sunt amet aliquid necessitatibus sequi aspernatur
          est commodi iste cumque quos voluptatem labore id quidem tempore,
          molestiae harum.Lorem ipsum dolor sit amet consectetur adipisicing
          elit. Libero maiores officia cum sunt amet aliquid necessitatibus
          sequi aspernatur est commodi iste cumque quos voluptatem labore id
          quidem tempore, molestiae harum. Lorem ipsum dolor sit amet
          consectetur adipisicing elit. Libero maiores officia cum sunt amet
          aliquid necessitatibus sequi aspernatur est commodi iste cumque quos
          voluptatem labore id quidem tempore, molestiae harum.
        </p>
        <SecondaryButton title="Mehr erfahren" link="/" />
      </div>
    </section>
  );
}
