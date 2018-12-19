// const Problem = require('../../model/problem.js');

// 获取最新公告
exports.latest = async (ctx, next) => {
  // await Problem.create({
  //   pid: 1,
  //   name: 'i am name',
  //   desc: 'i am desc',
  // });
  // const b = await Problem.find({ pid: 1 });
  // eslint-disable-next-line
  ctx.body = {
    status: Math.round(Math.random(0, 1)),
    msg: 'success',
    data: {
      text: '现在注册即送比特币！',
    },
  };
  next();
};
