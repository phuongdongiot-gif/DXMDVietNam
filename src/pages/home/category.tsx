import Section from "@/components/section";
import TransitionLink from "@/components/transition-link";
import { useProjectStore } from "@/stores/useProjectStore";
import { Link, useNavigate } from "react-router-dom";

export default function Category() {
  const categories = useProjectStore(s => s.categories);

  return (
    <Section title="Danh mục dự án" viewMoreTo="/categories">
      <div className="pt-2.5 pb-4 flex space-x-6 overflow-x-auto px-4">
        {categories.map((category) => (
          <TransitionLink
            key={category.id}
            className="flex flex-col items-center space-y-2 flex-none basis-[70px] overflow-hidden cursor-pointer group active:scale-95 transition-transform duration-200"
            to={`/category/${category.id}`}
          >
            <img
              src={category.image}
              className="w-[70px] h-[70px] object-cover rounded-full border-[0.5px] border-black/15"
              alt={category.name}
            />
            <div className="text-center text-sm w-full line-clamp-2 text-subtitle">
              {category.name}
            </div>
          </TransitionLink>
        ))}
      </div>
    </Section>
  );
}
