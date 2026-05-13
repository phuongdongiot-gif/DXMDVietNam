import Carousel from "@/components/carousel";
import { useAtomValue } from "jotai";
import { bannersState } from "@/state";

export default function Banners() {
  const banners = useAtomValue(bannersState) || [];

  return (
    <Carousel
      slides={banners.map((banner) => (
        <img className="w-full aspect-[21/9] object-cover rounded-xl shadow-[0_4px_12px_rgba(0,0,0,0.1)] border border-skeleton/50" src={banner} />
      ))}
    />
  );
}
