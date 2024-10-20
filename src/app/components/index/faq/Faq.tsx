import React from "react";
import FaqItem from "./FaqItem";

export default function Faq() {
  return (
    <section className="px-4 sm:px-16 max-w-[1600px] mx-auto py-24 grid grid-cols-1 gap-12 sm:grid-cols-12">
      <div className="col-span-6">
        <p>Über uns</p>
        <h1 className="Headline-md leading-tight">Was uns ausmacht</h1>
      </div>
      <div className="col-span-6 text-lg flex flex-col gap-4">
        <FaqItem title="Ich bin eine Frage?" text="Ich bin ein Text" />
        <FaqItem title="Ich bin eine Frage?" text="Ich bin ein Text" />
        <FaqItem title="Ich bin eine Frage?" text="Ich bin ein Text" />
        <FaqItem title="Ich bin eine Frage?" text="Ich bin ein Text" />
        <FaqItem title="Ich bin eine Frage?" text="Ich bin ein Text" />
        <FaqItem title="Ich bin eine Frage?" text="Ich bin ein Text" />
      </div>
    </section>
  );
}
