/**
 * 文章集合
 */

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const schema = new Schema({
  title: String,
  keyword: Array,
  tag: {
    type: Array,
    default: [],
  },
  content: String,
  contentMD: String,
  star: Number,
  creator: String,
}, {
  collection: 'article',
  timestamps: true,
});

module.exports = mongoose.model('article', schema);
