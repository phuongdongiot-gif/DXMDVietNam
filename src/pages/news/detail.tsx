import React from "react";
import { Page, Box, Text, Button } from "zmp-ui";
import { useParams, useNavigate } from "react-router-dom";
import { useNewsStore } from "@/stores/useNewsStore";
import HorizontalDivider from "@/components/horizontal-divider";

export default function NewsDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const post = useNewsStore((s) => s.posts.find(p => p.id === Number(id)));

  if (!post) {
    return (
      <Page className="bg-white flex flex-col items-center justify-center h-full">
        <Text>Không tìm thấy bài viết.</Text>
        <Button onClick={() => navigate(-1)} className="mt-4">Quay lại</Button>
      </Page>
    );
  }

  return (
    <Page className="bg-white flex flex-col">
      <div className="w-full h-56 relative">
        <img 
          src={post.imageUrl || "https://dxmdvietnam.vn/files/2026/04/du-an-fenica-di-an.jpg"} 
          alt={post.title} 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
          <Text className="text-white font-bold" size="xLarge" style={{ textShadow: "0 2px 4px rgba(0,0,0,0.5)" }}>
            {post.title}
          </Text>
        </div>
      </div>
      
      <Box p={4}>
        <Text size="small" className="text-subtitle mb-4">
          Đăng ngày: {new Date(post.date).toLocaleDateString('vi-VN')}
        </Text>
        
        <div 
          className="prose prose-sm max-w-none text-gray-800 leading-relaxed"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </Box>
      <HorizontalDivider />
      <Box p={4}>
        <Button fullWidth onClick={() => navigate('/contact')}>
          Nhận tư vấn dự án
        </Button>
      </Box>
    </Page>
  );
}
