const https = require('https');

https.get('https://dxmdvietnam.vn/wp-json/', (res) => {
  let data = '';
  res.on('data', (chunk) => { data += chunk; });
  res.on('end', () => {
    try {
      const json = JSON.parse(data);
      console.log("Namespaces:", json.namespaces);
      const routes = Object.keys(json.routes);
      console.log("Routes relating to posts/projects:");
      routes.filter(r => r.includes('/wp/v2/') || r.includes('project') || r.includes('du-an') || r.includes('property')).forEach(r => console.log(r));
    } catch(e) {
      console.error(e);
    }
  });
}).on('error', (err) => {
  console.log("Error: " + err.message);
});
