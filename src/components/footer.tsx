import { CategoryIcon, HomeIcon, MapIcon, CustomerSupportIcon, NewsIcon } from "./vectors";
import HorizontalDivider from "./horizontal-divider";
import TransitionLink from "./transition-link";

const NAV_ITEMS = [
  {
    name: "Trang chủ",
    path: "/",
    icon: HomeIcon,
  },
  {
    name: "Dự án",
    path: "/categories",
    icon: CategoryIcon,
  },
  {
    name: "Bản đồ",
    path: "/map",
    icon: MapIcon,
  },
  {
    name: "Tin tức",
    path: "/news",
    icon: NewsIcon,
  },
  {
    name: "Liên hệ",
    path: "/contact",
    icon: CustomerSupportIcon,
  },
];

export default function Footer() {
  return (
    <div className="bg-white border-t border-black/5 pb-[max(12px,env(safe-area-inset-bottom))] shadow-[0_-8px_30px_rgba(0,0,0,0.04)] relative z-40" style={{ viewTransitionName: 'app-footer' }}>
      <div
        className="w-full px-2 pt-2 flex justify-between items-center"
      >
        {NAV_ITEMS.map((item) => {
          return (
            <TransitionLink
              to={item.path}
              key={item.path}
              className="group flex-1 flex flex-col items-center justify-center py-1 cursor-pointer select-none"
            >
              {({ isActive }) => (
                <div className="relative flex flex-col items-center justify-center w-full h-full">
                  {/* Active Bubble Background */}
                  <div 
                    className={`absolute inset-0 mx-auto w-14 h-[42px] rounded-2xl transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${isActive ? 'bg-primary/10 scale-100 opacity-100' : 'bg-transparent scale-50 opacity-0'}`}
                  ></div>

                  {/* Icon */}
                  <div 
                    className={`relative z-10 w-6 h-6 flex justify-center items-center transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${isActive ? '-translate-y-0.5 text-primary scale-110' : 'translate-y-0 text-inactive scale-100 group-active:scale-90 group-active:opacity-70'}`}
                  >
                    <item.icon active={isActive} />
                  </div>

                  {/* Text */}
                  <div 
                    className={`relative z-10 text-[10px] font-medium transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] mt-0.5 ${isActive ? "text-primary opacity-100 translate-y-0" : "text-subtitle opacity-80 translate-y-0.5"}`}
                  >
                    {item.name}
                  </div>
                </div>
              )}
            </TransitionLink>
          );
        })}
      </div>
    </div>
  );
}
