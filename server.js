import express from 'express';
import compression from 'compression';
import bodyParser from 'body-parser';

// import 'isomorphic-fetch';

import router from './middleware/router';

const app = express();
app.use(compression());
app.use(express.static('./static'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true,
}));

app.use(router);

/*
const dataUrl = 'http://ce666649.ngrok.io/data.text';
let data = [];

const getData = () => {
  fetch(dataUrl)
    .then(response => {
      if (response.status >= 400) {
        throw new Error('Bad response from server');
      }
      return response.text();
    })
    .then(dataText => {
      data = dataText.split('\n').reverse().map(datum => {
        const bits = datum.split(' ');
        return {
          date: bits[0],
          startTime: parseInt(bits[1], 10),
          endTime: parseInt(bits[2], 10),
          kWh: parseFloat(bits[3]),
        };
      });
      setTimeout(getData, 10 * 1000);
    })
    .catch(err => {
      console.warn(err);
    });
};
getData();
*/


app.listen(5000, () => {
  console.log('Example app listening on port 5000!');
});
