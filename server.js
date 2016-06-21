import express from 'express';
import compression from 'compression';
import bodyParser from 'body-parser';

import router from './middleware/router';

const app = express();
app.use(compression());
app.use(express.static('./static'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true,
}));

app.use(router);

app.listen(5000, () => {
  console.log('Example app listening on port 5000!');
});
