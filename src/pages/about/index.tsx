import React, { useState, useEffect } from "react";
import { Page, Box, Text, Icon } from "zmp-ui";

interface HistoryItem {
  month: string;
  year: string;
  content: string;
}

interface CoreValueItem {
  img: string;
  title: string;
  sub: string;
}

interface AboutData {
  content: string;
  author: string;
  businessTitle: string;
  businessSubTitle: string;
  businessImg: string;
  coreValuesTitle: string;
  coreValues: CoreValueItem[];
  historyTitle: string;
  history: HistoryItem[];
  banner: string;
}

export default function AboutPage() {
  const [data, setData] = useState<AboutData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch("https://dxmdvietnam.vn/wp-json/wp/v2/pages?slug=gioi-thieu")
      .then(res => res.json())
      .then(resData => {
        if (resData && resData.length > 0) {
          const page = resData[0];
          const acf = page.acf || {};
          setData({
            content: page.content.rendered,
            author: acf.s1_author || "",
            businessTitle: acf.s2_title || "",
            businessSubTitle: acf.s2_sub_title || "",
            businessImg: acf.s2_img || "",
            coreValuesTitle: acf.s3_title || "",
            coreValues: acf.s3_list_item || [],
            historyTitle: acf.s4_title || "",
            history: acf.history || [],
            banner: acf.page_banner || ""
          });
        }
      })
      .catch(err => console.error("Error fetching about page:", err))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <Page className="flex flex-col bg-background overflow-y-auto pb-8">
      {isLoading ? (
        <div className="flex-1 flex items-center justify-center">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : data ? (
        <>
          {/* Banner */}
          {data.banner && (
            <div className="w-full aspect-[21/9] bg-skeleton relative">
              <img src={data.banner} className="w-full h-full object-cover" alt="DXMD Banner" />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <Text size="xxLarge" bold className="text-white text-center drop-shadow-md px-4">
                  Về chúng tôi
                </Text>
              </div>
            </div>
          )}

          {/* Intro Content */}
          <Box p={4} className="bg-white shadow-sm mb-2 border-b border-gray-100">
            <div 
              className="
                text-gray-700 text-[14.5px] leading-relaxed 
                [&_p]:mb-3 [&_strong]:text-primary [&_a]:text-secondary
                [&_img]:!max-w-full [&_img]:!w-auto [&_img]:!h-auto [&_img]:rounded-lg [&_img]:object-contain
                [&_figure]:!max-w-full [&_figure]:!w-auto [&_figure]:!m-0 [&_figure]:!mx-auto
                [&_iframe]:!max-w-full [&_iframe]:!w-full [&_iframe]:aspect-video
              "
              dangerouslySetInnerHTML={{ __html: data.content }}
            />
            {data.author && (
              <div className="mt-4 pt-4 border-t border-gray-100 flex justify-end">
                <Text size="small" bold className="text-gray-800 italic">
                  {data.author}
                </Text>
              </div>
            )}
          </Box>

          {/* Business Philosophy */}
          {(data.businessTitle || data.businessImg) && (
            <Box p={4} className="bg-white shadow-sm mb-2 border-y border-gray-100">
              <Text size="xLarge" bold className="text-primary mb-2 text-center">
                {data.businessTitle || "Triết lý kinh doanh"}
              </Text>
              {data.businessSubTitle && (
                <Text size="small" className="text-gray-600 text-center mb-4 italic">
                  "{data.businessSubTitle}"
                </Text>
              )}
              {data.businessImg && (
                <div className="w-full rounded-xl overflow-hidden shadow-sm">
                  <img src={data.businessImg} alt={data.businessTitle} className="w-full object-contain" />
                </div>
              )}
            </Box>
          )}

          {/* Core Values */}
          {data.coreValues && data.coreValues.length > 0 && (
            <Box p={4} className="bg-white shadow-sm mb-2 border-y border-gray-100">
              <Text size="xLarge" bold className="text-primary mb-4 text-center">
                {data.coreValuesTitle || "Tầm nhìn - Sứ mệnh - Giá trị cốt lõi"}
              </Text>
              <div className="space-y-4">
                {data.coreValues.map((item, index) => (
                  <div key={index} className="flex items-start bg-primary/5 p-4 rounded-xl border border-primary/10">
                    {item.img ? (
                      <div className="w-12 h-12 rounded-full bg-white flex-shrink-0 flex items-center justify-center p-2 shadow-sm mr-3">
                        <img src={item.img} alt={item.title} className="w-full h-full object-contain" />
                      </div>
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex-shrink-0 flex items-center justify-center mr-3">
                        <Icon icon="zi-star" className="text-primary" />
                      </div>
                    )}
                    <div>
                      <Text size="large" bold className="text-foreground mb-1">
                        {item.title}
                      </Text>
                      <Text size="small" className="text-gray-600 leading-relaxed">
                        {item.sub}
                      </Text>
                    </div>
                  </div>
                ))}
              </div>
            </Box>
          )}

          {/* History */}
          {data.history && data.history.length > 0 && (
            <Box p={4} className="bg-white shadow-sm mb-4 border-y border-gray-100">
              <Text size="xLarge" bold className="text-primary mb-6 text-center">
                {data.historyTitle || "Lịch sử hình thành"}
              </Text>
              <div className="relative pl-6 border-l-2 border-primary/20 ml-2 space-y-6">
                {data.history.map((item, index) => (
                  <div key={index} className="relative">
                    <div className="absolute -left-[31px] top-1 w-4 h-4 rounded-full bg-primary border-4 border-white shadow-sm"></div>
                    <Text size="small" bold className="text-secondary mb-1">
                      Tháng {item.month}/{item.year}
                    </Text>
                    <Text size="small" className="text-gray-700 leading-relaxed">
                      {item.content}
                    </Text>
                  </div>
                ))}
              </div>
            </Box>
          )}
        </>
      ) : (
        <div className="flex-1 flex flex-col items-center justify-center p-4">
          <Text className="text-gray-500 mb-4">Không tìm thấy thông tin giới thiệu.</Text>
        </div>
      )}
    </Page>
  );
}
