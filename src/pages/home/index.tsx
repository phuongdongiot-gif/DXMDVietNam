import { useNavigate } from "react-router-dom";
import Banners from "./banners";
import QuickActions from "./quick-actions";
import SearchBar from "../../components/search-bar";
import Category from "./category";
import FeaturedProjects from "./featured-projects";
import RecentProjects from "./recent-projects";
import NewsSection from "./news-section";
import GallerySection from "./gallery-section";
import CTA from "../../components/cta";

const HomePage: React.FunctionComponent = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-full bg-white pb-8">
      {/* Header Block with Clean Aesthetic */}
      <div className="bg-white pb-4 rounded-b-[24px] shadow-sm relative z-10">
        <div className="mt-2 relative z-10">
          <Banners />
        </div>
        <div className="mt-4 px-2 relative z-10">
          <QuickActions />
        </div>
      </div>

      {/* Search Bar */}
      <div className="mt-6 animate-fade-in-up" style={{ animationDelay: '0.05s' }}>
        <SearchBar onClick={() => navigate("/search")} />
      </div>

      {/* Main Content Areas */}
      <div className="px-4 mt-4">
        <div className="animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
          <Category />
        </div>

        <div className="animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          <FeaturedProjects />
        </div>

        <div className="animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
          <RecentProjects />
        </div>

        <div className="animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
          <GallerySection />
        </div>

        <div className="animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
          <CTA />
        </div>

        <div className="animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
          <NewsSection />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
