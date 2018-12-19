const Article = require('../../model/article');

exports.list = async (ctx, next) => {
  const { page, queryParam } = ctx.query;
  const { pageNo, pageSize } = JSON.parse(page);
  const { title } = JSON.parse(queryParam);

  const reg = new RegExp(title, 'i');

  const list = await Article.where('title', reg);
  // 当前数据
  const res = await Article
    .where('title', reg)
    .skip((pageNo - 1) * pageSize)
    .limit(pageSize)
    .sort('-createdAt');

  // 剔除所有的图片标签，提高加载速度
  const imgReg = /<img.*?(?:>|\/>)/gi;
  res.forEach((el) => {
    if (!el.content) {
      return;
    }
    const contentWithoutImg = el.content.replace(imgReg, '');
    el.content = contentWithoutImg;
  });
  ctx.body = {
    status: 0,
    msg: '',
    data: {
      list: res,
      total: list.length,
    },
  };
  next();
};

// 查询某个文章
exports.query = async (ctx, next) => {
  const { id } = ctx.query;
  // 当前数据
  try {
    const res = await Article.findById(id);
    ctx.body = {
      status: 0,
      msg: '',
      data: res,
    };
    next();
  } catch (e) {
    ctx.body = {
      status: 0,
      msg: '',
      data: {},
    };
    next();
  }
};

// 随机获取某个文章
exports.pickOne = async (ctx, next) => {
  // 随机策略
  const res = await Article.find({});
  const index = parseInt(Math.random() * res.length, 10);
  ctx.body = {
    status: 0,
    msg: '',
    data: res[index],
  };
  next();
};

// 添加新文章
exports.add = async (ctx, next) => {
  const res = await new Article(ctx.request.body).save();
  if (res) {
    ctx.body = {
      status: 0,
      msg: '',
      data: res,
    };
    next();
  } else {
    ctx.body = {
      status: -1,
      msg: '添加失败',
      data: {},
    };
    next();
  }
};

// 修改文章
exports.modify = async (ctx, next) => {
  const { id, title, tag, content, contentMD } = ctx.request.body;
  const res = await Article.update({ _id: id }, { title, tag, content, contentMD });
  if (res) {
    ctx.body = {
      status: 0,
      msg: '',
      data: res,
    };
    next();
  } else {
    ctx.body = {
      status: -1,
      msg: '编辑失败',
      data: {},
    };
    next();
  }
};

// 删除某篇文章
exports.del = async (ctx, next) => {
  const { id } = ctx.request.body;
  const res = await Article.findOneAndRemove({ _id: id });
  if (res) {
    ctx.body = {
      status: 0,
      msg: '',
      data: {},
    };
    next();
  } else {
    ctx.body = {
      status: -1,
      msg: '删除失败',
      data: {},
    };
    next();
  }
};
