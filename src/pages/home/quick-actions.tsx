import React from "react";
import { useNavigate } from "react-router-dom";


const QuickActions: React.FC = () => {
  const navigate = useNavigate();

  const actions = [
    {
      id: "about",
      label: "Giới thiệu",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-primary">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" fill="currentColor"/>
        </svg>
      ),
      path: "/about"
    },
    {
      id: "categories",
      label: "Dự án",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-primary">
          <path d="M4 4h4v4H4V4zm6 0h4v4h-4V4zm6 0h4v4h-4V4zM4 10h4v4H4v-4zm6 0h4v4h-4v-4zm6 0h4v4h-4v-4zM4 16h4v4H4v-4zm6 0h4v4h-4v-4zm6 0h4v4h-4v-4z" fill="currentColor"/>
        </svg>
      ),
      path: "/categories"
    },
    {
      id: "map",
      label: "Bản đồ",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-primary">
          <path d="M20.5 3l-.16.03L15 5.1 9 3 3.36 4.9c-.21.07-.36.25-.36.48V20.5c0 .28.22.5.5.5l.16-.03L9 18.9l6 2.1 5.64-1.9c.21-.07.36-.25.36-.48V3.5c0-.28-.22-.5-.5-.5zM15 19l-6-2.11V5l6 2.11V19z" fill="currentColor"/>
        </svg>
      ),
      path: "/map"
    },
    {
      id: "news",
      label: "Tin tức",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-primary">
          <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z" fill="currentColor"/>
        </svg>
      ),
      path: "/news"
    },
    {
      id: "contact",
      label: "Liên hệ",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-primary">
          <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H5.17L4 17.17V4h16v12z" fill="currentColor"/>
        </svg>
      ),
      path: "/contact"
    }
  ];

  return (
    <div className="grid grid-cols-5 gap-2 py-4 px-2 bg-transparent relative z-10">
      {actions.map((action) => (
        <div 
          key={action.id} 
          className="flex flex-col items-center justify-start cursor-pointer active:scale-95 transition-transform group"
          onClick={() => navigate(action.path)}
        >
          <div className="w-[48px] h-[48px] bg-gradient-to-br from-primary/10 via-primary/5 to-white rounded-[14px] flex items-center justify-center mb-2 shadow-sm border border-primary/20 group-hover:shadow-md group-hover:-translate-y-1 transition-all duration-300">
            {action.icon}
          </div>
          <span className="text-[11px] font-bold text-gray-800 text-center leading-tight">
            {action.label}
          </span>
        </div>
      ))}
    </div>
  );
};

export default QuickActions;
