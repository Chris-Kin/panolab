module.exports = () => async (ctx, next) => {
  const cookies = ctx.cookies;
  const userName = cookies.get('user_name');
  if (!ctx.request.header.referer.includes('/admin/')) {
    next();
  } else {
    if (!userName) {
      ctx.status = 401;
    }
    next();
  }
};
