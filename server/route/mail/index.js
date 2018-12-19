/**
 * 邮件相关的子路由
 */

const router = require('koa-router')();
const mail = require('./controller');

const routers = router
  .post('sendMail', mail.sendMail)
  .post('sendMails', mail.sendMail);

module.exports = routers;
