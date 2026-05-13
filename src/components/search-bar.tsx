import { SearchIcon } from "@/components/vectors";
import { forwardRef, HTMLAttributes, HTMLProps } from "react";

const SearchBar = forwardRef<HTMLInputElement, HTMLProps<HTMLInputElement>>(
  (props, ref) => {
    return (
      <div className="px-4">
        <div className="relative w-full">
          <input
            ref={ref}
            className="w-full h-12 pl-12 pr-3 bg-white text-base rounded-2xl outline-none placeholder:text-inactive shadow-sm border border-gray-100 focus:shadow-md transition-shadow"
            placeholder="Tìm kiếm dự án, tin tức..."
            {...props}
          />
          <SearchIcon className="absolute top-3 left-3" />
        </div>
      </div>
    );
  }
);

export default SearchBar;
