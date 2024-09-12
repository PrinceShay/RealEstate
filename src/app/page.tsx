import Image from "next/image";
import Hero from "./components/index/Hero/Hero";
import RecommendedObjects from "./components/index/recommendedObjects/RecommendedObjects";
import AboutUsIndex from "./components/index/aboutUs/AboutUsIndex";
import Progress from "./components/index/Progress/Progress";
import Faq from "./components/index/faq/Faq";

export default function Home() {
  return (
    <>
      <Hero />
      <RecommendedObjects />
      <AboutUsIndex />
      <Progress />
      <Faq />
    </>
  );
}
