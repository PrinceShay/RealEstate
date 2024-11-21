import AboutUsIndex from "../components/index/aboutUs/AboutUsIndex";
import Features from "../components/index/features/Features";
import Hero from "../components/index/Hero/Hero";
import Progress from "../components/index/Progress/Progress";
import RecommendedObjects from "../components/index/recommendedObjects/RecommendedObjects";
import Faq from "../components/index/faq/Faq";
import Preloader from "../components/shared/Preloader";

export default function Home() {
  return (
    <>
      <Preloader />
      <Hero />
      <RecommendedObjects />
      <AboutUsIndex />
      <Features />
      <Progress />
      <Faq />
    </>
  );
}
