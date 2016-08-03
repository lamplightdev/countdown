const express = require('express');
const compression = require('compression');
const bodyParser = require('body-parser');

const fs = require('fs');
const jsdom = require('jsdom').jsdom;
const serializeDocument = require('jsdom').serializeDocument;
const createVirtualConsole = require('jsdom').createVirtualConsole;


const app = express();
app.use(compression());
app.use(express.static('./static'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true,
}));

app.get('/:pageName?', (req, res) => {
  const pageName = req.params.pageName || 'list';

  const html = fs.readFileSync('./index.html');
  const doc = jsdom(html.toString().replace(/##pageName##/g, pageName), {
    virtualConsole: createVirtualConsole().sendTo(console),
  });

  doc.defaultView.onload = () => {
    res.send(serializeDocument(doc));
  };
});

app.listen(5000, () => {
  console.log('Example app listening on port 5000!');
});
