#!/usr/bin/env node

const { resolve } = require('path');
const Hexo = require('hexo');

// 设置工作目录
const baseDir = resolve(__dirname);
const hexo = new Hexo(baseDir, {
  debug: false,
  safe: false,
  silent: false
});

// 初始化并生成
hexo.init().then(() => {
  console.log('开始生成静态文件...');
  return hexo.call('generate', {});
}).then(() => {
  console.log('生成完成！');
  return hexo.exit();
}).catch(err => {
  console.error('生成失败:', err);
  process.exit(1);
});
