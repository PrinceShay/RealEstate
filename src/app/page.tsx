import Hero from "./components/index/Hero/Hero";
import RecommendedObjects from "./components/index/recommendedObjects/RecommendedObjects";
import AboutUsIndex from "./components/index/aboutUs/AboutUsIndex";
import Progress from "./components/index/Progress/Progress";
import Faq from "./components/index/faq/Faq";
import Features from "./components/index/features/Features";

export default function Home() {
  return (
    <>
      <Hero />
      <RecommendedObjects />
      <AboutUsIndex />
      <Features />
      <Progress />
      <Faq />
    </>
  );
}
