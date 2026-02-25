#!/usr/bin/env node

const start = Date.now();

const Hexo = require('hexo');

const hexo = new Hexo(__dirname, {
  debug: true
});

hexo.init().then(() => {
  console.log('Hexo initialized');
  console.log('Loaded posts:', hexo.locals.get('posts').toArray().length);
  return hexo.call('generate', {});
}).then(() => {
  console.log('Generation completed in', (Date.now() - start) / 1000, 'seconds');
  return hexo.exit();
}).catch(err => {
  console.error('Generate failed:', err);
  process.exit(1);
});
