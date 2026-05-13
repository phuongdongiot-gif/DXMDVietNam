import Section from "@/components/section";
import TransitionLink from "@/components/transition-link";
import { useAtomValue } from "jotai";
import { categoriesState } from "@/state";

export default function Category() {
  const categories = useAtomValue(categoriesState) || [];

  return (
    <Section title="Loại hình Dự án" viewMoreTo="/categories">
      <div className="pt-3 pb-5 overflow-x-auto px-4 hide-scrollbar">
        <div className="grid grid-rows-2 grid-flow-col gap-x-4 gap-y-4 auto-cols-[85px]">
          {categories.map((category) => (
            <TransitionLink
              key={category.id}
              className="flex flex-col items-center cursor-pointer group active:scale-95 transition-transform duration-200"
              to={`/category/${category.id}`}
            >
              <div className="w-[85px] h-[85px] rounded-2xl overflow-hidden shadow-sm border border-secondary/20 bg-skeleton relative">
                <img
                  src={category.image}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  alt={category.name}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent"></div>
              </div>
              <div className="mt-2 text-center text-xs font-medium w-full line-clamp-2 text-foreground">
                {category.name}
              </div>
            </TransitionLink>
          ))}
        </div>
      </div>
    </Section>
  );
}
