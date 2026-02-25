#!/usr/bin/env node

const { resolve } = require('path');
const Hexo = require('hexo');

// 设置工作目录
const baseDir = resolve(__dirname);
const hexo = new Hexo(baseDir, {
  debug: true,
  safe: false,
  silent: false
});

hexo.init().then(() => {
  console.log('=== Hexo 初始化完成 ===');
  console.log('文章数量:', hexo.locals.get('posts').toArray().length);
  console.log('页面数量:', hexo.locals.get('pages').toArray().length);

  const posts = hexo.locals.get('posts').toArray();
  posts.forEach(post => {
    console.log('文章:', post.title, '- path:', post.path);
  });

  return hexo.call('generate', {});
}).then(() => {
  console.log('=== 生成完成 ===');
  return hexo.exit();
}).catch(err => {
  console.error('错误:', err);
  process.exit(1);
});
