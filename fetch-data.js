const https = require('https');
const fs = require('fs');

function fetchUrl(url, filename) {
  https.get(url, (res) => {
    let data = '';
    res.on('data', (chunk) => { data += chunk; });
    res.on('end', () => {
      try {
        fs.writeFileSync(filename, data);
        console.log(`Saved ${filename}`);
      } catch(e) {
        console.error(e);
      }
    });
  }).on('error', (err) => {
    console.log("Error: " + err.message);
  });
}

fetchUrl('https://dxmdvietnam.vn/wp-json/wp/v2/du-an?_embed&per_page=5', 'sample-projects.json');
fetchUrl('https://dxmdvietnam.vn/wp-json/acf/v3/du-an?per_page=5', 'sample-acf.json');
