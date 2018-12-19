const mongoose = require('mongoose');

module.exports = () => {
  const host = '127.0.0.1';
  const port = '27027';
  const user = 'admin';
  const pass = '123qwe';
  const db = 'word';

  const url = `mongodb://${user}:${pass}@${host}:${port}/${db}`;

  // 创建数据链接实例
  mongoose.connect(url);
  const conn = mongoose.connection;
  conn.on('error', (err) => {
    console.log(`mongodb数据错误: ${err}`);
  });
  conn.on('open', () => {
    console.log('数据库连接成功..');
  });
};
