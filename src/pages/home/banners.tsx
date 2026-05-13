import Carousel from "@/components/carousel";
import { useProjectStore } from "@/stores/useProjectStore";

export default function Banners() {
  const banners = useProjectStore(s => s.banners);

  return (
    <Carousel
      slides={banners.map((banner) => (
        <img className="w-full rounded" src={banner} />
      ))}
    />
  );
}
