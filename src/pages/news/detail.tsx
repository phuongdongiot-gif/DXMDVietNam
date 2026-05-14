import React from "react";
import { Page, Box, Text, Button } from "zmp-ui";
import { useParams, useNavigate } from "react-router-dom";
import { useNewsStore } from "@/stores/useNewsStore";
import HorizontalDivider from "@/components/horizontal-divider";
import Carousel from "@/components/carousel";
import TransitionLink from "@/components/transition-link";
import api from "zmp-sdk";

export default function NewsDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const post = useNewsStore((s) => s.posts.find(p => p.id === Number(id)));

  React.useEffect(() => {
    if (post) {
      // Strip HTML from title if present
      const rawTitle = post.title.replace(/<[^>]+>/g, '');
      document.title = `${rawTitle} - Công ty Cổ phần DXMD Việt Nam`;
      const metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription) {
        metaDescription.setAttribute('content', post.excerpt || `Bài viết: ${rawTitle}`);
      }
    }
  }, [post]);

  if (!post) {
    return (
      <Page className="bg-white flex flex-col items-center justify-center h-full">
        <Text>Không tìm thấy bài viết.</Text>
        <Button onClick={() => navigate(-1)} className="mt-4">Quay lại</Button>
      </Page>
    );
  }

  const handleChatZalo = () => {
    try {
      api.openChat({
        type: "oa",
        id: "4318657068771012646",
        message: `Tôi muốn nhận thông tin tư vấn và bảng giá.`
      });
    } catch (error) {
      navigate("/contact");
    }
  };

  // Decode basic HTML entities and strip tags for clean text
  const cleanExcerpt = post.excerpt
    ? post.excerpt.replace(/<[^>]+>/g, '').replace(/\[&hellip;\]/g, '...').replace(/&nbsp;/g, ' ')
    : '';

  const cleanTitle = post.title
    .replace(/<[^>]+>/g, '')
    .replace(/&#038;/g, '&')
    .replace(/&#8211;/g, '-')
    .replace(/&#8212;/g, '--')
    .replace(/&#8220;/g, '"')
    .replace(/&#8221;/g, '"')
    .replace(/&#8216;/g, "'")
    .replace(/&#8217;/g, "'");

  const cleanContent = post.content
    ? post.content.replace(/style\s*=\s*(['"])(.*?)\1/gi, '')
    : '';

  const allPosts = useNewsStore((s) => s.posts);
  const relatedPosts = allPosts.filter(p => p.id !== Number(id)).slice(0, 5);

  const relatedSlides = relatedPosts.map((p) => (
    <TransitionLink key={p.id} to={`/news/${p.id}`} className="block w-[160px] cursor-pointer group" replace>
      <div className="w-full aspect-[4/3] bg-skeleton rounded-lg overflow-hidden mb-2 relative shadow-sm border border-gray-100">
        <img src={p.imageUrl || `${import.meta.env.VITE_BASE_URL}/files/2026/04/du-an-fenica-di-an.jpg`} className="w-full h-full object-cover group-active:scale-105 transition-transform" alt={p.title.replace(/<[^>]+>/g, '')} />
      </div>
      <h4 className="text-xs font-semibold text-foreground line-clamp-2 leading-tight" dangerouslySetInnerHTML={{ __html: p.title }} />
    </TransitionLink>
  ));

  return (
    <Page className="bg-white flex flex-col overflow-y-auto">
      {/* 1. Cover Image */}
      <div className="w-full aspect-video relative bg-skeleton">
        <img
          src={post.imageUrl || `${import.meta.env.VITE_BASE_URL}/files/2026/04/du-an-fenica-di-an.jpg`}
          alt={cleanTitle}
          className="w-full h-full object-cover"
        />
      </div>

      <Box p={4} className="bg-white">
        {/* 2. Header */}
        <h1 className="text-[20px] font-bold text-gray-900 leading-snug mb-3">
          {cleanTitle}
        </h1>

        <div className="flex items-center text-xs text-gray-500 mb-5">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="mr-1.5"><path d="M8 2V5M16 2V5M3.5 9.09H20.5M21 8.5V17C21 20 19.5 22 16 22H8C4.5 22 3 20 3 17V8.5C3 5.5 4.5 3.5 8 3.5H16C19.5 3.5 21 5.5 21 8.5Z" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" /></svg>
          {post.date}
        </div>

        {/* 3. Sapo (Excerpt Box) */}
        {cleanExcerpt && (
          <div className="bg-[#f0f7ff] border-l-4 border-primary p-3 rounded-r-lg mb-6 shadow-sm">
            <p className="text-[14px] font-medium text-gray-700 leading-relaxed italic">
              <div dangerouslySetInnerHTML={{ __html: cleanExcerpt }} />
            </p>
          </div>
        )}

        {/* 4. Main Content - Bulletproof Responsive CSS against WP junk */}
        <div
          className="
            text-gray-800 leading-relaxed text-[15px]
            [&_.wp-caption]:!max-w-full [&_.wp-caption]:!w-full
            [&_img]:!max-w-full [&_img]:!w-auto [&_img]:!h-auto [&_img]:rounded-lg [&_img]:my-4 [&_img]:mx-auto [&_img]:shadow-sm [&_img]:object-contain
            [&_iframe]:!max-w-full [&_iframe]:!w-full [&_iframe]:aspect-video [&_iframe]:rounded-lg [&_iframe]:my-4
            [&_p]:mb-4 [&_h2]:text-lg [&_h2]:font-bold [&_h2]:mt-6 [&_h2]:mb-3
            [&_h3]:text-base [&_h3]:font-bold [&_h3]:mt-5 [&_h3]:mb-2
            [&_a]:text-primary [&_a]:underline [&_a]:pointer-events-none
            [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:mb-4
            [&_ol]:list-decimal [&_ol]:pl-5 [&_ol]:mb-4
            [&_figure]:!max-w-full [&_figure]:!w-auto [&_figure]:!m-0 [&_figure]:!mx-auto [&_figcaption]:text-center [&_figcaption]:text-xs [&_figcaption]:text-gray-500 [&_figcaption]:mt-1
            [&_table]:!max-w-full [&_table]:block [&_table]:overflow-x-auto
          "
          dangerouslySetInnerHTML={{ __html: cleanContent.replace(/data-src=/g, 'src=').replace(/data-lazy-src=/g, 'src=') }}
        />
      </Box>

      <HorizontalDivider />

      {/* 4.5 Related Posts Carousel */}
      {relatedPosts.length > 0 && (
        <Box p={4} className="bg-white pt-2 pb-6">
          <h3 className="font-bold text-foreground text-base mb-2 border-l-4 border-primary pl-2">
            Bài viết liên quan
          </h3>
          <div className="-mx-4">
            <Carousel slides={relatedSlides} itemsPerView="auto" />
          </div>
        </Box>
      )}

      {/* 5. Sticky/Floating CTA Box */}
      <Box p={4} className="bg-gray-50 pb-8">
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-400 to-primary"></div>
          <h3 className="font-bold text-gray-900 text-base mb-1.5">Nhận bộ tài liệu dự án</h3>
          <p className="text-[13px] text-gray-500 mb-4 px-2">Bảng giá gốc từ Nhà phát triển, chính sách thanh toán & mặt bằng chi tiết.</p>
          <Button fullWidth onClick={handleChatZalo} size="large" className="rounded-xl font-bold shadow-md shadow-primary/20">
            Liên hệ tư vấn ngay
          </Button>
        </div>
      </Box>
    </Page>
  );
}
