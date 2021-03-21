const debug = require('debug')('app');
const chalk = require('chalk');

const app = require('./server');

// eslint-disable-next-line no-unused-vars
const sky = 'http://192.168.0.33:5000';
const house = 'http://192.168.1.26:5000';

const host = house;

const port = process.env.PORT || 5000;

app.listen(port, () => {
  debug(`Server runing in ${chalk.green(`${host}:${port}`)}`);
});

app.all('/*', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', req.headers.origin || '*');
  res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,HEAD,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'content-Type,x-requested-with');
  next();
});

module.exports = app;
