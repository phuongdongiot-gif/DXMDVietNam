import Section from "@/components/section";
import TransitionLink from "@/components/transition-link";
import { useEffect } from "react";
import { useNewsStore } from "@/stores/useNewsStore";

export default function NewsSection() {
  const { posts, isLoading, fetchPosts } = useNewsStore();

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  if (isLoading || posts.length === 0) {
    return (
      <Section title="Tin tức Sự kiện" viewMoreTo="/news">
        <div className="px-4 pb-4">
          <div className="w-full aspect-video bg-skeleton animate-pulse rounded-xl mb-4"></div>
          <div className="grid grid-cols-2 gap-3">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="w-full aspect-[4/3] bg-skeleton animate-pulse rounded-lg"></div>
            ))}
          </div>
        </div>
      </Section>
    );
  }

  const mainNews = posts[0];
  const gridNews = posts.slice(1, 5);

  return (
    <Section title="Tin tức Sự kiện" viewMoreTo="/news">
      <div className="px-4 pb-4">
        {/* Full Card for the first news */}
        <TransitionLink
          to={`/news/${mainNews.id}`}
          className="block mb-4 overflow-hidden rounded-xl bg-white shadow-sm border border-gray-100 active:scale-[0.98] transition-transform"
        >
          <div className="w-full aspect-video relative bg-skeleton">
            <img
              src={mainNews.imageUrl}
              alt={mainNews.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-2 left-2 px-1 py-1 text-white bg-black/10 backdrop-blur-md rounded-md text-[10px] font-medium uppercase tracking-wider">
              {mainNews.category || "Tin tức"}
            </div>
          </div>
          <div className="p-3">
            <h3 className="text-base font-bold text-foreground line-clamp-2 leading-tight" dangerouslySetInnerHTML={{ __html: mainNews.title }}></h3>
            <div className="text-xs text-subtitle mt-2 flex items-center">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-1">
                <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M12 6V12L16 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              {mainNews.date}
            </div>
          </div>
        </TransitionLink>

        {/* Grid for the next 4 news items */}
        {gridNews.length > 0 && (
          <div className="grid grid-cols-2 gap-3">
            {gridNews.map((news) => (
              <TransitionLink
                key={news.id}
                to={`/news/${news.id}`}
                className="flex flex-col overflow-hidden rounded-lg bg-white shadow-sm border border-gray-100 active:scale-[0.98] transition-transform"
              >
                <div className="w-full aspect-[4/3] bg-skeleton">
                  <img
                    src={news.imageUrl}
                    alt={news.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-2 flex-1 flex flex-col justify-between">
                  <h4 className="text-xs font-semibold text-foreground line-clamp-2 leading-snug" dangerouslySetInnerHTML={{ __html: news.title }}></h4>
                  <div className="text-[10px] text-subtitle mt-1.5 flex items-center">
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-1">
                      <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M12 6V12L16 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    {news.date}
                  </div>
                </div>
              </TransitionLink>
            ))}
          </div>
        )}
      </div>
    </Section>
  );
}
