const { resolve } = require('path');
const { spawn } = require('child_process');

const hexoPath = resolve(__dirname, 'node_modules', 'hexo', 'bin', 'hexo');

const args = process.argv.slice(2);
const cmd = spawn('node', [hexoPath, ...args], {
  cwd: __dirname,
  stdio: 'inherit'
});

cmd.on('exit', (code) => {
  process.exit(code || 0);
});
