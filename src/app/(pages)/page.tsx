import AboutUsIndex from "../components/index/aboutUs/AboutUsIndex";
import Features from "../components/index/features/Features";
import Hero from "../components/index/Hero/Hero";
import RecommendedObjects from "../components/index/recommendedObjects/RecommendedObjects";
import Faq from "../components/index/faq/Faq";
import Preloader from "../components/shared/Preloader";
import Testimonial from "../components/index/Testimonials/Testimonial";
import BlogSection from "../components/index/Blog/BlogSection";

export default function Home() {
  return (
    <>
      <Preloader />
      <Hero />
      <RecommendedObjects />
      <AboutUsIndex />
      <Features />
      <BlogSection />
      <Testimonial />
      <Faq />
    </>
  );
}
