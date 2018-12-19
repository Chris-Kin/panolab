/**
 * 文章相关的子路由
 */

const router = require('koa-router')();
const controller = require('./controller');

const routers = router
  .get('list', controller.list)
  .get('query', controller.query)
  .get('pickOne', controller.pickOne)
  .post('del', controller.del)
  .post('modify', controller.modify)
  .post('add', controller.add);

module.exports = routers;
