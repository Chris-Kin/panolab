/**
 * 路由整合
 */

const router = require('koa-router')();

const article = require('./article');

router.use('/api/article/', article.routes(), article.allowedMethods());

module.exports = router;
