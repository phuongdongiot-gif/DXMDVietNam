import { PropsWithChildren, ReactNode } from "react";
import { ChevronRight } from "./vectors";
import { Link, To } from "react-router-dom";
import TransitionLink from "./transition-link";

export interface SectionProps {
  title: ReactNode;
  viewMoreTo?: To;
}

export default function Section(props: PropsWithChildren<SectionProps>) {
  return (
    <div className="bg-white rounded-[24px] pt-4 pb-4 mb-4 shadow-[0_2px_12px_rgba(0,0,0,0.03)] border border-gray-100 overflow-hidden">
      <div className="flex items-center justify-between px-4 mb-2">
        <div className="text-lg font-bold text-gray-900 truncate flex items-center">
          <div className="w-1.5 h-5 bg-primary rounded-full mr-2"></div>
          {props.title}
        </div>
        {props.viewMoreTo && (
          <TransitionLink
            className="text-xs font-semibold text-primary bg-primary/10 px-3 py-1.5 rounded-full flex items-center space-x-1 cursor-pointer active:scale-95 transition-transform"
            to={props.viewMoreTo}
          >
            <span>Xem tất cả</span>
            <ChevronRight />
          </TransitionLink>
        )}
      </div>
      {props.children}
    </div>
  );
}
