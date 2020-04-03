import Rinse from '@cauldron/rinse';
import RtpCommand from './rtp';
import JsCommand from './js';
import colors from '@cauldron/colors';
import cauldron from 'cauldron';
import axios from 'axios';
import server from 'http2';
// import express from 'express';

function setMotd({ setMotd }) {
  setMotd(colors.green('This server is running Cauldron'));
}

cauldron.events.on('serverlistping', setMotd);

const App = () => (
  <>
    <RtpCommand />
    <JsCommand />
  </>
);

Rinse.mount(<App />);

const s = server.createServer();

s.listen(8080, 'localhost');
s.on('connect', (request, response) => {
  response.write('Hello world');
  response.end();
});

// const app = express();
// app.use(express.static('./site/public'));
// app.use('/css', express.static('./site/public/css'));
// app.use('/js', express.static('./site/public/js'));
// app.use('/images', express.static('./site/public/images'));

// const server = app.listen(25566, () => {
//   const port = server.address().port;
//   console.log(`Web server started on http://localhost:${port}`);
// });
