import { useNavigate } from "react-router-dom";
import Banners from "./banners";
import QuickActions from "./quick-actions";
import SearchBar from "../../components/search-bar";
import Category from "./category";
import FeaturedProjects from "./featured-projects";
import RecentProjects from "./recent-projects";
import NewsSection from "./news-section";
import GallerySection from "./gallery-section";
import HorizontalDivider from "@/components/horizontal-divider";

const HomePage: React.FunctionComponent = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-full bg-section">
      <div className="bg-background pt-2 pb-2 animate-fade-in-up">
        <SearchBar onClick={() => navigate("/search")} />
        <Banners />
        <QuickActions />
      </div>
      
      <div className="bg-background animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
        <Category />
      </div>
      
      <HorizontalDivider />
      
      <div className="bg-background pb-2 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
        <FeaturedProjects />
      </div>
      
      <HorizontalDivider />
      
      <div className="bg-background pb-2 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
        <RecentProjects />
      </div>

      <HorizontalDivider />
      
      <div className="bg-background pb-2 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
        <GallerySection />
      </div>
      
      <HorizontalDivider />
      
      <div className="bg-background pb-2 animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
        <NewsSection />
      </div>
    </div>
  );
};

export default HomePage;
