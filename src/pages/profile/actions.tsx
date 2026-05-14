import { useNavigate } from "react-router-dom";
import { Icon } from "zmp-ui";

export default function ProfileActions() {
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-lg p-4 grid grid-cols-4 gap-4 shadow-sm border border-secondary/20">
      {[
        {
          label: "Giới thiệu",
          icon: "zi-info-circle",
          onClick: () => navigate("/about"),
        },
        {
          label: "Tài liệu",
          icon: "zi-note",
          onClick: () => navigate(`/webview?url=${encodeURIComponent(`${import.meta.env.VITE_BASE_URL}/thu-vien/tai-lieu/`)}`),
        },
        {
          label: "Tin tức",
          icon: "zi-gallery",
          onClick: () => navigate("/news"),
        },
        {
          label: "Tuyển dụng",
          icon: "zi-user-solid",
          onClick: () => navigate(`/webview?url=${encodeURIComponent(`${import.meta.env.VITE_BASE_URL}/tuyen-dung/`)}`),
        },
      ].map((action) => (
        <div
          key={action.label}
          className="flex flex-col gap-2 items-center cursor-pointer active:scale-95 transition-transform"
          onClick={action.onClick}
        >
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
            <Icon icon={action.icon as any} />
          </div>
          <div className="text-2xs text-center font-medium text-foreground">{action.label}</div>
        </div>
      ))}
    </div>
  );
}
