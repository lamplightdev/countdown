const express = require('express');
const session = require('express-session');
const compression = require('compression');
const bodyParser = require('body-parser');

const fs = require('fs');
const jsdom = require('jsdom').jsdom;
const serializeDocument = require('jsdom').serializeDocument;
const createVirtualConsole = require('jsdom').createVirtualConsole;


const app = express();

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: {
    secure: false,
  },
}));

app.use(compression());
app.use(express.static('./static'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true,
}));

const defined = (...vars) => vars.every(varName => typeof varName !== 'undefined');

app.get('/:pageName?', (req, res, next) => {
  const validPages = [
    'list',
    'account',
  ];

  const pageName = req.params.pageName || 'list';

  if (validPages.indexOf(pageName) > -1) {
    const html = fs.readFileSync('./index.html');

    if (!req.session.items) {
      req.session.items = [];
    }

    const initParams = {
      items: req.session.items,
    };

    const htmlString = html
      .toString()
      .replace(/##pageName##/g, JSON.stringify(pageName))
      .replace(/##initParams##/g, JSON.stringify(initParams));

    const doc = jsdom(htmlString, {
      virtualConsole: createVirtualConsole().sendTo(console),
    });

    doc.defaultView.onload = () => {
      res.send(serializeDocument(doc));
    };
  } else {
    next();
  }
});

app.post('/add', (req, res) => {
  if (defined(req.body.id, req.body.title, req.body.latitude, req.body.longitude)) {
    req.session.items.push({
      id: req.body.id,
      title: req.body.title,
      latitude: req.body.latitude,
      longitude: req.body.longitude,
    });

    res.json(true);
  } else {
    res.json(false);
  }
});

app.post('/edit/:id', (req, res) => {
  if (defined(req.params.id, req.body.title, req.body.latitude, req.body.longitude)) {
    req.session.items[req.params.id] = {
      id: req.body.id,
      title: req.body.title,
      latitude: req.body.latitude,
      longitude: req.body.longitude,
    };

    res.json(true);
  } else {
    res.json(false);
  }
});

app.post('/remove/:id', (req, res) => {
  if (defined(req.params.id)) {
    req.session.items.splice(req.params.id, 1);

    res.json(true);
  } else {
    res.json(false);
  }
});

app.listen(5000, () => {
  console.log('Example app listening on port 5000!');
});
