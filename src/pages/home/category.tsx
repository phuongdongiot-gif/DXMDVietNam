import Section from "@/components/section";
import TransitionLink from "@/components/transition-link";
import { useAtomValue } from "jotai";
import { categoriesState } from "@/state";

export default function Category() {
  const categories = useAtomValue(categoriesState) || [];

  return (
    <Section title="Loại hình Dự án">
      <div className="px-4 pb-4">
        <div className="grid grid-cols-2 gap-4">
          {categories.map((category) => (
            <TransitionLink
              key={category.id}
              className="relative flex flex-col items-center justify-center cursor-pointer group active:scale-95 transition-transform duration-200 rounded-2xl overflow-hidden shadow-sm aspect-square"
              to={`/category/${category.id}`}
            >
              <img
                src={category.image}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                alt={category.name}
              />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors duration-300"></div>
              <div className="relative z-10 text-center px-2">
                <div className="text-white font-bold text-lg md:text-xl uppercase tracking-wider drop-shadow-md">
                  {category.name}
                </div>
              </div>
            </TransitionLink>
          ))}
        </div>
      </div>
    </Section>
  );
}
