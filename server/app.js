// node基础库
const path = require('path');

// Koa框架
const Koa = require('koa');

// 中间件
const json = require('koa-json');
const logger = require('koa-logger');
const koaStatic = require('koa-static');
const staticCache = require('koa-static-cache');
const bodyparser = require('koa-bodyparser');
const historyApiFallback = require('koa-history-api-fallback');
const compress = require('koa-compress');

const auth = require('./middleware/auth');

const routers = require('./route/');
const config = require('./config/server');

// 连接数据库
require('./config/db.js')();

const app = new Koa();

app.use(compress({ threshold: 2048 }));
app.use(bodyparser());
app.use(json());
app.use(logger());
app.use(historyApiFallback());
app.use(staticCache(path.resolve('dist'), {
  maxAge: 0.05 * 24 * 60 * 60,
}));
app.use(koaStatic(path.resolve('dist')));

app.use(routers.routes()).use(routers.allowedMethods());

app.use(auth());

app.on('error', (err) => {
  console.log('server error', err);
});
app.listen(config.port, () => {
  console.log(`Koa is listening in ${config.port}`);
});

module.exports = app;
