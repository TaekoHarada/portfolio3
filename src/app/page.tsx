import AboutSection from "./components/AboutSection";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import HeroSection from "./components/HeroSection";
import Navbar from "./components/Navbar";
import NewsSection from "./components/NewsSection";
import ProjectsSection from "./components/ProjectsSection";
// import Parser from "rss-parser";

// const parser = new Parser();

// export const getInitialProps = async () => {
//   try {
//     const feed = await parser.parseURL(
//       `https://www.wired.com/feed/category/business/latest/rss`
//     );
//     console.log("Fetched news:", feed.items);
//     return { props: { feed: feed.items } };
//   } catch (err) {
//     console.error("Error fetching RSS feed:", err);
//     return { props: { feed: [] } }; // Return empty array on error
//   }
// };

export default function Home() {
  // console.log("Fetched news:", feed);

  return (
    <main className="flex min-h-screen flex-col bg-stone-100">
      <Navbar />
      <div className="container mx-auto px-auto py-5 mt-20 sm:mt-0 ">
        <HeroSection />
        <ProjectsSection />
        <AboutSection />
        <NewsSection />
        <Contact />
      </div>
      <Footer />
    </main>
  );
}
