/**
 * 通知相关的子路由
 */

const router = require('koa-router')();
const controller = require('./controller');

const routers = router
  .get('latest', controller.latest);

module.exports = routers;
