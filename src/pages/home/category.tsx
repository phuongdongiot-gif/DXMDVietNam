import Section from "@/components/section";
import TransitionLink from "@/components/transition-link";
import { useAtomValue } from "jotai";
import { categoriesState } from "@/state";

export default function Category() {
  const categories = useAtomValue(categoriesState) || [];

  return (
    <Section title="Loại hình Dự án">
      <div className="pt-2 pb-4 overflow-x-auto hide-scrollbar px-4">
        <div className="flex space-x-4 w-max">
          {categories.map((category) => (
            <TransitionLink
              key={category.id}
              className="flex flex-col items-center justify-center cursor-pointer group active:scale-95 transition-transform duration-200"
              to={`/category/${category.id}`}
            >
              <div className="w-[88px] h-[88px] rounded-lg overflow-hidden shadow-[0_4px_12px_rgba(0,0,0,0.08)] border-2 border-white bg-skeleton relative mb-2">
                <img
                  src={category.image}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  alt={category.name}
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300"></div>
              </div>
              <div className="text-[13px] font-semibold text-gray-800 text-center w-[88px] truncate">
                {category.name}
              </div>
            </TransitionLink>
          ))}
        </div>
      </div>
    </Section>
  );
}
