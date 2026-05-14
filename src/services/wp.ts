export const fetchBannersAPI = async () => {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/wp/v2/pages?slug=trang-chu`);
  const data = await res.json();
  if (data && data.length > 0 && data[0].acf && data[0].acf.slider_home) {
    const sliderHome = data[0].acf.slider_home;
    const imageIds = sliderHome.map((item: any) => item.img).filter(Boolean);
    
    if (imageIds.length > 0) {
      const mediaRes = await fetch(`${import.meta.env.VITE_API_URL}/wp/v2/media?include=${imageIds.join(',')}`);
      const mediaData = await mediaRes.json();
      
      return sliderHome.map((item: any) => {
        const mediaItem = mediaData.find((m: any) => m.id === item.img);
        return mediaItem ? mediaItem.source_url : null;
      }).filter(Boolean);
    }
  }
  return null;
};

export const fetchRawProductsAPI = async () => {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/wp/v2/du-an?danh-muc-du-an=5,6&_embed&per_page=100`);
  return await res.json();
};

export const fetchGalleryAPI = async () => {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/wp/v2/thu-vien?_embed&per_page=10`);
  return await res.json();
};

export const fetchNewsAPI = async () => {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/wp/v2/posts?_embed&per_page=20`);
  return await res.json();
};

export const fetchOptionsAPI = async () => {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/acf/v3/options/options`);
  return await res.json();
};

export const fetchAboutPageAPI = async () => {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/wp/v2/pages?slug=gioi-thieu`);
  return await res.json();
};
