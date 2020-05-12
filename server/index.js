const express = require('express');
const bodyParser = require('body-parser');
const pino = require('express-pino-logger')();

const microdata = require('microdata-node');
const fetch = require('node-fetch');

const PORT = process.env.PORT || '3001';

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(pino);
app.use(express.static(require('path').join(__dirname, 'build')));


app.get('/api', async (req, res) => {
  const type = 'https://schema.org/BroadcastEvent';

  const channels = [
    { url: 'COMEDY', label: 'Comedy Central' },
    { url: 'RTL', label: 'RTL' },
    { url: 'TV2', label: 'TV2' },
    { url: 'FILMPLUS', label: 'Film+' },
    { url: 'DISCOVERY', label: 'Discovery' }
  ];

  const url = `https://musor.tv/mai/tvmusor`;

  const requests = [];

  channels.forEach(c => {
    const tv = fetch(`${url}/${c.url}`)
      .then(r => r.text())
      .then(html => microdata.toJson(html))
      .then(channel => {
        const items = channel.items
          .filter(x => x.type.includes(type))
          .map(x => x.properties)
          .map(x => {
            const item = {};
            Object.keys(x).forEach(key => item[key] = x[key][0]);
      
            return item;
          });

        const result = [];
        items.forEach(x => {
          if (result.every(r => r.startDate !== x.startDate && r.name !== x.name)) {
            result.push(x);
          }
        })
        return result
          .slice(0, result.length - 5);
      })
      .then(items => {
        return {
          items,
          channel: c
        };
      });

    requests.push(tv);
  })

  const response = await Promise.all(requests);
  res.send({ response });
});

app.get('*', (req, res) => {
  res.sendFile(require('path').join(__dirname, '/build/index.html'));
});  

app.listen(PORT, () => {
  console.log(`Express server is running on localhost:${PORT}`);
});
