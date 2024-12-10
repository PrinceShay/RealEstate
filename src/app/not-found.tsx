import React from "react";

export default function NotFound() {
  return (
    <main className="bg-mintGreen-light min-h-screen flex items-center justify-center text-gray-darkest">
      <div className="flex flex-col items-center justify-center text-center">
        <h1 className="text-5xl">Wann kommt deine Seite?</h1>
        <p className="text-xl mt-12">
          Schau dir die anderen Projekte auf meinem Portfolio an.
        </p>
        <a
          className="text-xl mt-2 hover:underline"
          href="https://www.jannisroestel.de"
        >
          jannisroestel.de
        </a>
      </div>
    </main>
  );
}
