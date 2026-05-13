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
      <div className="bg-background pt-2 pb-2">
        <SearchBar onClick={() => navigate("/search")} />
        <Banners />
        <QuickActions />
      </div>
      
      <div className="bg-background">
        <Category />
      </div>
      
      <HorizontalDivider />
      
      <div className="bg-background pb-2">
        <FeaturedProjects />
      </div>
      
      <HorizontalDivider />
      
      <div className="bg-background pb-2">
        <RecentProjects />
      </div>

      <HorizontalDivider />
      
      <div className="bg-background pb-2">
        <GallerySection />
      </div>
      
      <HorizontalDivider />
      
      <div className="bg-background pb-2">
        <NewsSection />
      </div>
    </div>
  );
};

export default HomePage;
