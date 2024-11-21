"use client";
import { toast } from "@/hooks/use-toast";
import { ArrowUpRight } from "lucide-react";
import { useState, FormEvent, ChangeEvent } from "react";

export default function NewsletterForm() {
  const [email, setEmail] = useState<string>("");

  async function subscribeToNewsletter(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (res.ok) {
        // Erfolgreiche Anmeldung
        toast({
          title: "Vielen Dank für Ihre Anmeldung zum Newsletter!",
          description:
            "Sie erhalten künftig spannende Updates und exklusive Inhalte direkt in Ihr Postfach.",
        });
        setEmail("");
      } else {
        // Fehler bei der Anmeldung
        toast({
          title: "Es gab ein Problem bei der Anmeldung.",
          description: "Bitte versuche es später nochmal.",
        });
      }
    } catch (error) {
      console.error("Anmeldefehler:", error);
      toast({
        title: "Es gab ein Problem bei der Anmeldung.",
        description: "Bitte versuche es später nochmal.",
      });
    }
  }

  return (
    <form
      onSubmit={subscribeToNewsletter}
      className="flex items-center bg-gray-dark dark:bg-gray-darker max-w-80 gap-2 p-2 rounded-2xl focus-within:outline-mintGreen-light outline outline-none"
    >
      <input
        type="email"
        name="email"
        placeholder="Deine E-Mail"
        id="emailInput"
        value={email}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setEmail(e.target.value)
        }
        required
        className="h-full p-2 w-full bg-transparent outline-none focus:placeholder:opacity-0"
      />

      <button
        type="submit"
        className=" py-2 flex items-center justify-center aspect-square h-full bg-mintGreen-dark text-white rounded-md hover:bg-mintGreen-darkHover "
      >
        <ArrowUpRight />
      </button>
    </form>
  );
}
