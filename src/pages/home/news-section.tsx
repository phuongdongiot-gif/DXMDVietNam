import Section from "@/components/section";
import TransitionLink from "@/components/transition-link";

// Mock data for news since there is no API/Store yet
const MOCK_NEWS = [
  {
    id: 1,
    title: "DXMD Vietnam chính thức ra mắt siêu dự án nghỉ dưỡng mới tại ven biển",
    image: "https://images.unsplash.com/photo-1582407947304-fd86f028f716?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    date: "12/05/2026",
    category: "Thị trường"
  },
  {
    id: 2,
    title: "Tiến độ thi công tháng 5: Hoàn thiện móng cọc dự án ABC",
    image: "https://images.unsplash.com/photo-1541888086925-920a0b66b267?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60",
    date: "10/05/2026"
  },
  {
    id: 3,
    title: "Cơ hội đầu tư shophouse sinh lời kép trong năm nay",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60",
    date: "08/05/2026"
  },
  {
    id: 4,
    title: "Thị trường bất động sản rục rịch khởi sắc cuối quý 2",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60",
    date: "05/05/2026"
  },
  {
    id: 5,
    title: "DXMD tổ chức thành công lễ tri ân khách hàng thân thiết",
    image: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60",
    date: "02/05/2026"
  }
];

export default function NewsSection() {
  const mainNews = MOCK_NEWS[0];
  const gridNews = MOCK_NEWS.slice(1, 5);

  return (
    <Section title="Tin tức Sự kiện" viewMoreTo="/news">
      <div className="px-4 pb-4">
        {/* Full Card for the first news */}
        <TransitionLink
          to={`/news/${mainNews.id}`}
          className="block mb-4 overflow-hidden rounded-xl bg-white shadow-sm border border-secondary/20 active:scale-[0.98] transition-transform"
        >
          <div className="w-full aspect-video relative bg-skeleton">
            <img 
              src={mainNews.image} 
              alt={mainNews.title} 
              className="w-full h-full object-cover"
            />
            <div className="absolute top-2 left-2 px-2 py-1 glassmorphism bg-primary/80 rounded-md text-[10px] text-white font-medium uppercase tracking-wider">
              {mainNews.category}
            </div>
          </div>
          <div className="p-3">
            <h3 className="text-base font-bold text-foreground line-clamp-2 leading-tight">
              {mainNews.title}
            </h3>
            <div className="text-xs text-subtitle mt-2 flex items-center">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-1">
                <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12 6V12L16 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              {mainNews.date}
            </div>
          </div>
        </TransitionLink>

        {/* Grid for the next 4 news items */}
        <div className="grid grid-cols-2 gap-3">
          {gridNews.map((news) => (
            <TransitionLink
              key={news.id}
              to={`/news/${news.id}`}
              className="flex flex-col overflow-hidden rounded-lg bg-white shadow-sm border border-secondary/20 active:scale-[0.98] transition-transform"
            >
              <div className="w-full aspect-[4/3] bg-skeleton">
                <img 
                  src={news.image} 
                  alt={news.title} 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-2 flex-1 flex flex-col justify-between">
                <h4 className="text-xs font-semibold text-foreground line-clamp-2 leading-snug">
                  {news.title}
                </h4>
                <div className="text-[10px] text-subtitle mt-1.5 flex items-center">
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-1">
                    <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M12 6V12L16 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  {news.date}
                </div>
              </div>
            </TransitionLink>
          ))}
        </div>
      </div>
    </Section>
  );
}
