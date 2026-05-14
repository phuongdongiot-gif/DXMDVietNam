import Carousel from "@/components/carousel";
import { useAtomValue } from "jotai";
import { bannersState } from "@/state";

export default function Banners() {
  const banners = useAtomValue(bannersState) || [];

  return (
    <Carousel
      slides={banners.map((banner) => (
        <img className="w-full aspect-[21/9] object-cover rounded-xl shadow-sm border border-gray-100" src={banner} />
      ))}
    />
  );
}
