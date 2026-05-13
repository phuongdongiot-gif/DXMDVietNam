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
    <>
      <HorizontalDivider />
      <div
        className="w-full px-4 pt-2 grid"
        style={{
          gridTemplateColumns: `repeat(${NAV_ITEMS.length}, 1fr)`,
          paddingBottom: `max(16px, env(safe-area-inset-bottom))`,
        }}
      >
        {NAV_ITEMS.map((item) => {
          return (
            <TransitionLink
              to={item.path}
              key={item.path}
              className="group flex flex-col items-center space-y-0.5 p-1 pb-1 cursor-pointer active:scale-[0.95] hover:bg-skeleton/30 rounded-lg transition-all duration-300 relative"
            >
              {({ isActive }) => (
                <>
                  <div className={`w-6 h-6 flex justify-center items-center transition-transform duration-300 ${isActive ? '-translate-y-1' : 'group-hover:-translate-y-0.5'}`}>
                    <item.icon active={isActive} />
                  </div>
                  <div className={`text-2xs font-medium transition-colors duration-300 ${isActive ? "text-primary font-semibold" : "text-subtitle"}`}>
                    {item.name}
                  </div>
                  {isActive && (
                    <div className="absolute bottom-0 w-1 h-1 rounded-full bg-primary animate-scale-in"></div>
                  )}
                </>
              )}
            </TransitionLink>
          );
        })}
      </div>
    </>
  );
}
