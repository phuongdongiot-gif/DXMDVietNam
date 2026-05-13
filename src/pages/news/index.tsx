import React, { useEffect, useState } from "react";
import { Page, Box, Text } from "zmp-ui";
import { useNewsStore } from "@/stores/useNewsStore";
import { useNavigate } from "react-router-dom";
import Carousel from "@/components/carousel";
import TransitionLink from "@/components/transition-link";
import api from "zmp-sdk";

const NEWS_CATEGORIES = ["Tất cả", "Tin tức dự án", "Tin DXMD Vietnam"];

export default function NewsPage() {
  const { posts, isLoading, fetchPosts } = useNewsStore();
  const navigate = useNavigate();
  const [activeCat, setActiveCat] = useState(NEWS_CATEGORIES[0]);

  const handleChat = () => {
    try {
      api.openChat({
        type: "oa",
        id: import.meta.env.VITE_ZALO_OA_ID || "0",
        message: "Tôi muốn đăng ký nhận thông tin mới nhất về các dự án và bảng giá từ DXMD Vietnam.",
      });
    } catch (error) {
      navigate("/contact");
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  const filteredPosts = posts.filter(post => {
    if (activeCat === "Tất cả") return true;
    return post.category.toLowerCase().includes(activeCat.toLowerCase().replace("tin ", ""));
  });

  // Safe slicing logic based on available posts
  const heroPosts = filteredPosts.slice(0, 3);
  const trendingPosts = filteredPosts.slice(3, 6);
  const highlightPost = filteredPosts.length > 6 ? filteredPosts[6] : null;
  const topRankingPosts = filteredPosts.slice(7, 10);
  const gridPosts = filteredPosts.slice(10, 14);
  const remainingPosts = filteredPosts.slice(14);

  // Slides for Carousel
  const carouselSlides = heroPosts.map((post) => (
    <TransitionLink
      key={post.id}
      to={`/news/${post.id}`}
      className="block w-full h-[220px] rounded-2xl overflow-hidden relative shadow-md"
    >
      <img
        src={post.imageUrl || "https://dxmdvietnam.vn/files/2026/04/du-an-fenica-di-an.jpg"}
        alt={post.title}
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>
      <div className="absolute top-3 left-3 bg-primary/90 text-white text-[10px] uppercase font-bold px-2 py-1 rounded backdrop-blur-sm">
        Tiêu điểm
      </div>
      <div className="absolute bottom-3 left-3 right-3">
        <h3 className="text-white font-bold text-sm line-clamp-2 leading-snug drop-shadow-md" dangerouslySetInnerHTML={{ __html: post.title }} />
        <div className="text-white/80 text-[10px] mt-1 flex items-center">
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-1">
            <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M12 6V12L16 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          {post.date}
        </div>
      </div>
    </TransitionLink>
  ));

  return (
    <Page className="bg-section flex flex-col hide-scrollbar">
      <Box p={4} className="bg-background pt-2 pb-0">
        <Text size="xLarge" bold className="text-foreground">
          Tin tức & Sự kiện
        </Text>
        <Text size="small" className="text-subtitle mb-2">
          Cập nhật thị trường mới nhất từ DXMD Vietnam
        </Text>

        {/* Breaking News Bar */}
        {posts.length > 0 && (
          <div className="flex items-center bg-accent/10 border border-accent/20 rounded-lg p-2 mb-2 animate-fade-in">
            <div className="bg-accent text-white text-[10px] font-bold px-2 py-0.5 rounded mr-2 flex-none animate-pulse">
              MỚI NHẤT
            </div>
            <div className="text-xs text-foreground font-medium truncate flex-1" dangerouslySetInnerHTML={{ __html: posts[0].title }} />
          </div>
        )}
      </Box>

      {/* Category Pills */}
      <div className="bg-background sticky top-0 z-20 py-3 border-b border-black/5">
        <div className="flex px-4 overflow-x-auto hide-scrollbar space-x-2">
          {NEWS_CATEGORIES.map(cat => (
            <div
              key={cat}
              onClick={() => setActiveCat(cat)}
              className={`flex-none px-4 py-1.5 rounded-full text-xs font-medium cursor-pointer transition-colors ${activeCat === cat
                ? "bg-primary text-white shadow-sm"
                : "bg-section text-subtitle border border-secondary/20"
                }`}
            >
              {cat}
            </div>
          ))}
        </div>
      </div>

      <div className="flex-1 bg-background pb-8">
        {isLoading && posts.length === 0 ? (
          <div className="p-4 space-y-4">
            <div className="w-full h-[220px] bg-skeleton animate-pulse rounded-2xl"></div>
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="w-full h-24 bg-skeleton animate-pulse rounded-xl"></div>
            ))}
          </div>
        ) : filteredPosts.length === 0 ? (
          <div className="text-center text-subtitle py-10">Không có bài viết nào trong chuyên mục này.</div>
        ) : (
          <div className="space-y-6 mt-3">

            {/* 1. Featured News Carousel */}
            {heroPosts.length > 0 && (
              <div className="px-4">
                <Carousel slides={carouselSlides} />
              </div>
            )}

            {/* 2. Trending Horizontal Scroll */}
            {trendingPosts.length > 0 && (
              <div className="pt-2 px-4">
                <h3 className="font-bold text-foreground text-sm mb-3 flex items-center">
                  <span className="text-accent mr-1"></span> Đáng chú ý
                </h3>
                <div className="flex overflow-x-auto space-x-3 hide-scrollbar pb-2">
                  {trendingPosts.map((post) => (
                    <TransitionLink key={post.id} to={`/news/${post.id}`} className="flex-none w-[160px] cursor-pointer group">
                      <div className="w-full aspect-[4/3] bg-skeleton rounded-lg overflow-hidden mb-2 relative shadow-sm border border-secondary/20">
                        <img src={post.imageUrl} className="w-full h-full object-cover group-active:scale-105 transition-transform" alt="trending" />
                      </div>
                      <h4 className="text-xs font-semibold text-foreground line-clamp-2 leading-tight" dangerouslySetInnerHTML={{ __html: post.title }} />
                    </TransitionLink>
                  ))}
                </div>
              </div>
            )}

            <div className="bg-section h-2 w-full"></div>

            {/* 3. Highlight Big Card */}
            {highlightPost && (
              <div className="px-4">
                <h3 className="font-bold text-foreground text-sm mb-3 flex items-center">
                  <span className="text-primary mr-1">★</span> Tiêu điểm thị trường
                </h3>
                <TransitionLink to={`/news/${highlightPost.id}`} className="block group active:scale-[0.98] transition-transform">
                  <div className="w-full aspect-video rounded-xl overflow-hidden bg-skeleton mb-3 shadow-sm border border-secondary/20">
                    <img src={highlightPost.imageUrl} className="w-full h-full object-cover" alt="highlight" />
                  </div>
                  <div className="text-[10px] text-primary font-medium mb-1 uppercase tracking-wider">
                    {highlightPost.category || "Tin tức"}
                  </div>
                  <h3 className="text-base font-bold text-foreground line-clamp-2 leading-tight mb-2" dangerouslySetInnerHTML={{ __html: highlightPost.title }} />
                  <p className="text-xs text-subtitle line-clamp-2 leading-relaxed">{highlightPost.excerpt}</p>
                </TransitionLink>
              </div>
            )}

            <div className="bg-section h-2 w-full"></div>

            {/* 4. Top Ranking List (Numbered) */}
            {topRankingPosts.length > 0 && (
              <div className="px-4">
                <h3 className="font-bold text-foreground text-sm mb-3 flex items-center">
                  <span className="text-accent mr-1"></span> Đọc nhiều nhất
                </h3>
                <div className="space-y-3">
                  {topRankingPosts.map((post, idx) => (
                    <TransitionLink key={post.id} to={`/news/${post.id}`} className="flex items-center active:scale-[0.98] transition-transform bg-white rounded-lg p-2 border border-secondary/10 shadow-sm">
                      <div className="text-3xl font-black text-secondary/30 italic mr-3 w-8 text-center flex-none">
                        {idx + 1}
                      </div>
                      <div className="flex-1">
                        <h4 className="text-sm font-bold text-foreground line-clamp-2 leading-tight mb-1" dangerouslySetInnerHTML={{ __html: post.title }} />
                        <div className="text-[10px] text-subtitle">{post.date}</div>
                      </div>
                      <div className="w-16 h-16 rounded overflow-hidden flex-none ml-2 bg-skeleton">
                        <img src={post.imageUrl} className="w-full h-full object-cover" alt="" />
                      </div>
                    </TransitionLink>
                  ))}
                </div>
              </div>
            )}

            {/* 5. Grid View */}
            {gridPosts.length > 0 && (
              <div className="px-4">
                <h3 className="font-bold text-foreground text-sm mb-3 flex items-center">
                  <span className="text-primary mr-1"></span> Bất động sản
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {gridPosts.map(post => (
                    <TransitionLink key={post.id} to={`/news/${post.id}`} className="flex flex-col bg-white rounded-xl overflow-hidden shadow-sm border border-secondary/20 active:scale-[0.98] transition-transform">
                      <div className="w-full aspect-[4/3] bg-skeleton">
                        <img src={post.imageUrl} className="w-full h-full object-cover" alt="" />
                      </div>
                      <div className="p-2 flex flex-col justify-between flex-1">
                        <h4 className="text-xs font-semibold text-foreground line-clamp-3 leading-snug mb-1" dangerouslySetInnerHTML={{ __html: post.title }} />
                        <div className="text-[9px] text-subtitle">{post.date}</div>
                      </div>
                    </TransitionLink>
                  ))}
                </div>
              </div>
            )}

            {/* 6. Standard Vertical List for Remaining */}
            {remainingPosts.length > 0 && (
              <div className="px-4 space-y-3">
                {remainingPosts.map((post) => (
                  <TransitionLink key={post.id} to={`/news/${post.id}`} className="flex items-center bg-white rounded-xl overflow-hidden shadow-sm border border-secondary/20 active:scale-[0.98] transition-transform p-2">
                    <div className="w-[90px] h-[70px] rounded-lg overflow-hidden flex-none bg-skeleton">
                      <img src={post.imageUrl} alt="" className="w-full h-full object-cover" />
                    </div>
                    <div className="ml-3 flex-1">
                      <div className="text-[9px] text-primary font-medium mb-0.5 uppercase tracking-wider">{post.category}</div>
                      <h4 className="text-xs font-bold text-foreground line-clamp-2 leading-tight mb-1" dangerouslySetInnerHTML={{ __html: post.title }} />
                      <div className="text-[9px] text-subtitle">{post.date}</div>
                    </div>
                  </TransitionLink>
                ))}
              </div>
            )}

            {/* 7. Newsletter CTA */}
            {!isLoading && posts.length > 0 && (
              <div className="mx-4 mt-6 mb-2 bg-gradient-to-br from-primary to-primary/80 rounded-2xl p-5 text-white shadow-lg relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -mr-10 -mt-10 pointer-events-none"></div>
                <h3 className="font-bold text-lg mb-2 relative z-10">Đừng bỏ lỡ cơ hội đầu tư</h3>
                <p className="text-xs text-white/90 mb-4 relative z-10">Đăng ký để nhận thông tin mới nhất về các dự án và bảng giá từ DXMD Vietnam.</p>
                <button 
                  onClick={handleChat}
                  className="w-full flex items-center justify-center space-x-2 bg-white/20 p-3 rounded-xl relative z-10 backdrop-blur-sm border border-white/30 hover:bg-white/30 transition-colors cursor-pointer active:scale-95"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-white">
                    <path d="M20 2H4C2.9 2 2 2.9 2 4V22L6 18H20C21.1 18 22 17.1 22 16V4C22 2.9 21.1 2 20 2ZM20 16H5.17L4 17.17V4H20V16Z" fill="currentColor"/>
                  </svg>
                  <span className="text-white font-bold text-sm">Nhắn tin nhận thông tin</span>
                </button>
              </div>
            )}

          </div>
        )}
      </div>
    </Page>
  );
}
