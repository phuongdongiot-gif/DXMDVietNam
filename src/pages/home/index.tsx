import { useNavigate } from "react-router-dom";
import Banners from "./banners";
import QuickActions from "./quick-actions";
import SearchBar from "../../components/search-bar";
import Category from "./category";
import FeaturedProjects from "./featured-projects";
import RecentProjects from "./recent-projects";
import NewsSection from "./news-section";
import GallerySection from "./gallery-section";

const HomePage: React.FunctionComponent = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-full bg-[#F4F5F7] pb-8">
      {/* Header Block */}
      <div className="bg-white pb-4 rounded-b-[32px] shadow-[0_4px_24px_rgba(0,0,0,0.04)] animate-fade-in-up relative z-10">
        <div className="pt-2 px-4">
          <SearchBar onClick={() => navigate("/search")} />
        </div>
        <div className="mt-1">
          <Banners />
        </div>
        <div className="mt-4 px-2">
          <QuickActions />
        </div>
      </div>
      
      {/* Main Content Areas */}
      <div className="px-4 mt-6">
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
          <NewsSection />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
