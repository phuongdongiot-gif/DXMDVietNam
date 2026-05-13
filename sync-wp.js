const https = require('https');
const fs = require('fs');
const path = require('path');

const PRODUCTS_FILE = path.join(__dirname, 'src', 'mock', 'products.json');
const CATEGORIES_FILE = path.join(__dirname, 'src', 'mock', 'categories.json');
const BANNERS_FILE = path.join(__dirname, 'src', 'mock', 'banners.json');

const CATEGORY_ID = 1;

https.get('https://dxmdvietnam.vn/wp-json/wp/v2/du-an?_embed&per_page=20', (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    const projects = JSON.parse(data);
    
    // Create one category
    const categories = [
      {
        id: CATEGORY_ID,
        name: "Căn hộ Cao cấp",
        image: projects.length > 0 && projects[0]._embedded && projects[0]._embedded['wp:featuredmedia'] ? projects[0]._embedded['wp:featuredmedia'][0].source_url : "https://dxmdvietnam.vn/files/2026/04/du-an-fenica-di-an.jpg"
      },
      {
        id: 2,
        name: "Đất nền",
        image: projects.length > 1 && projects[1]._embedded && projects[1]._embedded['wp:featuredmedia'] ? projects[1]._embedded['wp:featuredmedia'][0].source_url : "https://dxmdvietnam.vn/files/2026/04/can-ho-diamond-boulevard.jpg"
      }
    ];

    const products = projects.map((p, index) => {
      const imageUrl = p._embedded && p._embedded['wp:featuredmedia'] ? p._embedded['wp:featuredmedia'][0].source_url : "https://dxmdvietnam.vn/files/2026/04/du-an-fenica-di-an.jpg";
      const rawContent = p.content && p.content.rendered ? p.content.rendered : '';
      const content = rawContent.replace(/<[^>]+>/g, '').substring(0, 200) + '...';
      return {
        id: p.id,
        name: p.title.rendered.replace(/&#038;/g, '&'),
        price: 35000000 + (index * 1000000), // Mock price
        originalPrice: 40000000 + (index * 1000000),
        image: imageUrl,
        category: categories[index % 2],
        details: [
          {
            title: "Tổng quan",
            content: content
          },
          {
            title: "Website",
            content: p.link
          }
        ],
        sizes: [],
        colors: []
      };
    });

    const banners = projects.slice(0, 3).map(p => {
      return p._embedded && p._embedded['wp:featuredmedia'] ? p._embedded['wp:featuredmedia'][0].source_url : "https://dxmdvietnam.vn/files/2026/04/du-an-fenica-di-an.jpg";
    });

    fs.writeFileSync(PRODUCTS_FILE, JSON.stringify(products, null, 2));
    fs.writeFileSync(CATEGORIES_FILE, JSON.stringify(categories, null, 2));
    fs.writeFileSync(BANNERS_FILE, JSON.stringify(banners, null, 2));
    console.log('Successfully synced data to src/mock/');
  });
}).on('error', err => console.error(err));
