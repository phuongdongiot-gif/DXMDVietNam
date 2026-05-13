import { CategoryIcon, HomeIcon, MapIcon, CustomerSupportIcon, OrderHistoryIcon } from "./vectors";
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
    icon: OrderHistoryIcon, // using this as a document/news icon
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
              className="flex flex-col items-center space-y-0.5 p-1 pb-0.5 cursor-pointer active:scale-105 transition-transform"
            >
              {({ isActive }) => (
                <>
                  <div className="w-6 h-6 flex justify-center items-center">
                    <item.icon active={isActive} />
                  </div>
                  <div className={`text-2xs font-medium ${isActive ? "text-primary" : "text-subtitle"}`}>
                    {item.name}
                  </div>
                </>
              )}
            </TransitionLink>
          );
        })}
      </div>
    </>
  );
}
