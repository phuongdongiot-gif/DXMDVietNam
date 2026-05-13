import { useEffect } from "react";
import api from "zmp-sdk";

export default function FollowOAWidget() {
  useEffect(() => {
    api.showOAWidget({
      id: "oaWidget",
      guidingText: "Quan tâm OA để nhận các đặc quyền ưu đãi",
      color: "#F7F7F8",
    });
  }, []);

  return <div id="oaWidget" />;
}
