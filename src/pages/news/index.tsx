import React, { useEffect } from "react";
import { Page, Box, Text } from "zmp-ui";
import { useNewsStore } from "@/stores/useNewsStore";
import { useNavigate } from "react-router-dom";

export default function NewsPage() {
  const { posts, isLoading, fetchPosts } = useNewsStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (posts.length === 0) {
      fetchPosts();
    }
  }, []);

  return (
    <Page className="bg-background flex flex-col">
      <Box p={4} className="bg-white sticky top-0 z-10 shadow-sm">
        <Text size="xLarge" bold className="text-primary">
          Tin tức thị trường
        </Text>
        <Text size="small" className="text-subtitle">
          Cập nhật thông tin mới nhất từ DXMD Vietnam
        </Text>
      </Box>

      <Box p={4} className="space-y-4">
        {isLoading && posts.length === 0 ? (
          <Text className="text-center text-subtitle">Đang tải tin tức...</Text>
        ) : (
          posts.map((post, index) => (
            <div 
              key={post.id} 
              className="bg-white rounded-xl overflow-hidden shadow-sm flex flex-col active:scale-[0.98] transition-transform duration-300 ease-out animate-fade-in-up group"
              style={{ animationDelay: `${index * 0.05}s` }}
              onClick={() => navigate(`/news/${post.id}`)}
            >
              <div className="overflow-hidden">
                <img 
                  src={post.imageUrl || "https://dxmdvietnam.vn/files/2026/04/du-an-fenica-di-an.jpg"} 
                  alt={post.title} 
                  className="w-full h-40 object-cover transition-transform duration-500 group-hover:scale-105" 
                />
              </div>
              <div className="p-3">
                <Text size="normal" bold className="line-clamp-2 text-primary mb-1">
                  {post.title}
                </Text>
                <Text size="xSmall" className="text-subtitle mb-2">
                  {new Date(post.date).toLocaleDateString('vi-VN')}
                </Text>
                <Text size="small" className="line-clamp-2 text-gray-600">
                  {post.excerpt}
                </Text>
              </div>
            </div>
          ))
        )}
      </Box>
    </Page>
  );
}
