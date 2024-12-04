import React from "react";
import FaqItem from "./FaqItem";

export default function Faq() {
  const questions = [
    {
      title: "Wie unterstützt HomeFinder mich beim Kauf einer Immobilie?",
      answer:
        "Wir begleiten Dich durch den gesamten Kaufprozess – von der ersten Beratung bis zum Notartermin. Dabei helfen wir Dir, passende Immobilien zu finden, Besichtigungen zu organisieren und alle Formalitäten zu erledigen.",
    },
    {
      title: "Was kostet der Service von HomeFinder?",
      answer:
        "Unsere Kosten sind transparent und werden individuell vereinbart. In der Regel fällt eine Maklerprovision an, die abhängig von der Immobilie ist. Kontaktiere uns gerne für weitere Details.",
    },
    {
      title: "Wie wird der Wert meiner Immobilie ermittelt?",
      answer:
        "Unser Team führt eine fundierte Marktanalyse durch und berücksichtigt Faktoren wie Lage, Zustand und aktuelle Marktentwicklungen, um den optimalen Preis zu ermitteln.",
    },
    {
      title: "Kann ich HomeFinder auch für Vermietungen nutzen?",
      answer:
        "Ja, wir unterstützen Dich bei der Suche nach geeigneten Mietern, führen Besichtigungen durch und erstellen rechtssichere Mietverträge. Dabei legen wir großen Wert auf solvente und zuverlässige Interessenten.",
    },
    {
      title: "Wie lange dauert der Verkaufsprozess meiner Immobilie?",
      answer:
        "Die Dauer variiert je nach Immobilie und Marktbedingungen. In der Regel liegt die Verkaufszeit zwischen 2 und 6 Monaten, aber dank unserer Erfahrung können wir den Prozess oft beschleunigen.",
    },
    {
      title: "Bietet HomeFinder auch Unterstützung bei der Finanzierung?",
      answer:
        "Ja, wir arbeiten mit erfahrenen Finanzierungsexperten zusammen, die Dir helfen, die beste Lösung für Deine Bedürfnisse zu finden.",
    },
    {
      title:
        "Kann ich HomeFinder auch für Erbschafts- oder Scheidungsimmobilien beauftragen?",
      answer:
        "Ja, wir haben Erfahrung mit sensiblen Themen wie Erbschaften oder Scheidungen und unterstützen Dich diskret und professionell.",
    },
    {
      title: "Wie kann ich HomeFinder kontaktieren?",
      answer:
        "Du kannst uns telefonisch, per E-Mail oder über unser Kontaktformular auf der Website erreichen. Wir freuen uns darauf, Dir zu helfen!",
    },
  ];

  return (
    <section className="px-4 sm:px-16 max-w-[1600px] mx-auto py-24 grid grid-cols-1 gap-12 sm:grid-cols-12">
      <div className="col-span-6">
        <p>FAQ</p>
        <h1 className="text-4xl sm:text-5xl leading-tight">
          Oft gestellte Fragen
        </h1>
      </div>
      <div className="col-span-6 text-lg flex flex-col gap-4">
        {questions.map((question) => (
          <FaqItem
            key={question.title}
            title={question.title}
            text={question.answer}
          />
        ))}
      </div>
    </section>
  );
}
