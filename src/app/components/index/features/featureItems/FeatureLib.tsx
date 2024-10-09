import { useEffect, useRef } from "react";
import lottie, { AnimationItem } from "lottie-web";
import PrimaryButton from "@/app/components/shared/ui/PrimaryButton";
import Image from "next/image";

export const Bewertung = () => {
  return (
    <div className="relative bg-gradient-to-br group dark:from-gray-dark dark:to-gray-darker from-gray-lighter to-gray-lighter  dark:text-gray-lightest flex flex-col justify-end  h-full min-h-[50vh] w-full p-12">
      <div>
        <Image
          src={"/images/index/Features/Desktop - 1.jpg"}
          alt="Screenshot vom Bewertungstool"
          width={512}
          height={512}
          style={{
            transitionTimingFunction: "cubic-bezier(0.34, 1.56, 0.74, 1)",
          }}
          className="h-auto w-3/4 z-20 absolute -top-48 -right-16 group-hover:-top-6 group-hover:-right-6 rotate-12 group-hover:rotate-3 rounded-2xl border-4 group-hover:scale-105 transition-all  duration-500 dark:border-gray-darker"
        />
        <div className="w-3/4 h-1/2 bg-mintGreen-light absolute top-12 -right-12 rotate-6 blur-[256px] scale-50 opacity-35 group-hover:scale-100 group-hover:opacity-100 transition-all ease-out duration-300 "></div>
      </div>
      <div className="flex flex-col items-start relative z-20 group-hover:z-10 group-hover:opacity-0 ease-out transition-opacity duration-300">
        <h2 className="text-4xl">Immobilienbewertung</h2>
        <p className="text-lg mt-6 opacity-80 max-w-prose mb-6">
          Erstellung von professionellen Marktanalysen, um den aktuellen Wert
          einer Immobilie zu ermitteln.
        </p>
        <PrimaryButton title="Jetzt unverbindlich bewerten" link="/" />
      </div>
    </div>
  );
};

export const Marketing = () => {
  return (
    <div className=" bg-gradient-to-br dark:from-gray-dark dark:to-gray-darker from-gray-lighter to-gray-lighter  dark:text-gray-lightest h-full min-h-[33vh] w-full p-12 relative group">
      <h2 className="text-3xl group-hover:opacity-0 transition-opacity ease-out duration-300">
        Vermarktung von Immobilien
      </h2>
      <p className="text-lg mt-6 opacity-80 max-w-prose group-hover:opacity-0 transition-opacity ease-out duration-300">
        Nutzung verschiedener Kanäle, wie Online-Portale, Social Media und
        Printmedien, um Immobilien effektiv zu bewerben.
      </p>
      <Image
        width={512}
        height={512}
        style={{
          transitionTimingFunction: "cubic-bezier(0.34, 1.56, 0.74, 1)",
        }}
        alt="Screenshot"
        src={"/images/index/Features/screen_1.png"}
        className="absolute w-3/4 h-auto -rotate-3 mt-12 group-hover:-translate-y-[30%] group-hover:rotate-3 transition-transform duration-500 z-10"
      ></Image>
      <div className="absolute w-full h-full bottom-0 left-0 bg-gradient-to-t from-[#aee4cf]  via-mintGreen-dark   to-transparent group-hover:opacity-85 opacity-0 transition-opacity ease-out duration-300"></div>
    </div>
  );
};

export const Expose = () => {
  return (
    <div className="relative bg-gradient-to-br dark:from-gray-dark dark:to-gray-darker from-gray-lighter to-gray-lighter  dark:text-gray-lightest flex flex-col justify-end items-center group h-full min-h-[50vh] w-full p-12">
      <Image
        src={"/images/index/Features/expose.png"}
        alt="Exposé"
        width={512}
        height={512}
        style={{
          transitionTimingFunction: "cubic-bezier(0.34, 1.56, 0.74, 1)",
        }}
        className="w-3/4 relative h-auto group-hover:scale-[1.30] group-hover:-rotate-12 group-hover:top-8 transition-all duration-500 z-20"
      />
      <div className="group-hover:opacity-0 transiton ease-out duration-300">
        <h2 className="text-3xl">Erstellung von Exposés</h2>
        <p className="text-lg mt-6 opacity-80 max-w-prose">
          Anfertigung detaillierter Exposés mit Fotos, Grundrissen und
          Beschreibungen, um die Immobilie ansprechend darzustellen.
        </p>
      </div>
      <div className="absolute w-full h-full bottom-0 left-0 bg-gradient-to-t from-[#aee4cf]  via-mintGreen-dark   to-transparent group-hover:opacity-85 opacity-0 transition-opacity ease-out duration-300"></div>
    </div>
  );
};

export const Staging = () => {
  return (
    <div className="relative flex flex-col justify-end h-full min-h-[50vh] w-full group">
      <div className="w-full h-full absolute z-10">
        <div className="w-full h-full absolute bg-gradient-to-t group-hover:opacity-0 transition-opacity ease-out duration-300 dark:from-gray-dark from-gray-lighter to-transparent z-20"></div>
        <video
          className="w-full h-full object-cover z-10"
          autoPlay
          muted
          loop
          playsInline
        >
          <source src="/videos/Features/7578546-hd_1920_1080_30fps.webm" />
        </video>
      </div>
      <div className="p-12 z-30 dark:text-gray-lightest group-hover:translate-y-6 group-hover:opacity-0 transition-all ease-out duration-300">
        <h2 className="text-3xl relative">Home Staging</h2>
        <p className="text-lg mt-6 opacity-80 max-w-prose relative">
          Beratung und Unterstützung bei der optischen Aufbereitung der
          Immobilie, um diese ansprechender für potenzielle Käufer oder Mieter
          zu machen.
        </p>
      </div>
    </div>
  );
};

export const Finazierung = () => {
  const animationContainer = useRef<HTMLDivElement | null>(null);
  const animationInstance = useRef<AnimationItem | null>(null); // Ref for the animation instance

  useEffect(() => {
    if (animationContainer.current) {
      animationInstance.current = lottie.loadAnimation({
        container: animationContainer.current,
        renderer: "svg",
        loop: false,
        autoplay: false,
        path: "/animations/finance.json",
      });
    }

    // Cleanup the animation on component unmount
    return () => {
      if (animationInstance.current) {
        animationInstance.current.destroy();
      }
    };
  }, []);

  const handleMouseEnter = () => {
    animationInstance.current?.goToAndPlay(0, true); // Restart and play the animation
  };

  return (
    <div
      onMouseEnter={handleMouseEnter}
      className="bg-gradient-to-br dark:from-gray-dark dark:to-gray-darker from-gray-lighter to-gray-lighter group dark:text-gray-lightest flex flex-col justify-end items-center h-full min-h-[50vh] w-full p-12"
    >
      <div
        className="w-72 h-72 aspect-square flex items-center justify-center flex-grow group-hover:scale-110 transition-transform ease-out duration-300"
        ref={animationContainer}
      ></div>
      <div className="">
        <h2 className="text-3xl">Finanzierungsberatung</h2>
        <p className="text-lg mt-6 opacity-80 max-w-prose">
          Vermittlung von Finanzierungsoptionen durch Kooperationen mit Banken
          und Finanzberatern.
        </p>
      </div>
    </div>
  );
};
