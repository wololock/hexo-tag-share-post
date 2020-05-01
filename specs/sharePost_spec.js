'use strict';

const test = require('ava');
const Hexo = require('hexo');
const path = require('path');
const { contentFor, process, createSandbox } = require('hexo-test-utils');

const sandbox = createSandbox(Hexo, {
  fixture_folder: path.join(__dirname, 'fixtures'),
  plugins: [
    require.resolve('../index.js'),
    require.resolve('hexo-renderer-ejs'),
    require.resolve('hexo-renderer-markdown-it')
  ]
});

test('default facebook share link', async t => {
  const ctx = await sandbox({ fixtureName: 'simple-post' });

  await process(ctx);

  const content = await contentFor(ctx, '/facebook/index.html');

  t.true(content.includes('<a href="https://www.facebook.com/sharer/sharer.php?u=http://yoursite.com/facebook/&t=This%20is%20just%20test%20title" target="_blank" rel="noopener">Facebook</a>'));
});

test('default twitter share link', async t => {
  const ctx = await sandbox({ fixtureName: 'simple-post' });

  await process(ctx);

  const content = await contentFor(ctx, '/twitter/index.html');

  t.true(content.includes('<a href="https://twitter.com/intent/tweet?text=%22This%20is%20just%20test%20title%22%20http://yoursite.com/twitter/%20via%20@hexojs" target="_blank" rel="noopener">Twitter</a>'));
});

test('default linkedin share link', async t => {
  const ctx = await sandbox({ fixtureName: 'simple-post' });

  await process(ctx);

  const content = await contentFor(ctx, '/linkedin/index.html');

  t.true(content.includes('<a href="https://www.linkedin.com/sharing/share-offsite/?url=http://yoursite.com/linkedin/&title=This%20is%20just%20test%20title" target="_blank" rel="noopener">LinkedIn</a>'));
});

test('non existing channel', async t => {
  const ctx = await sandbox({ fixtureName: 'simple-post' });

  await process(ctx);

  const content = await contentFor(ctx, '/foobar/index.html');

  t.is(content.toString().trim().length, 0);
});

test('default facebook link in ejs template', async t => {
  const ctx = await sandbox({ fixtureName: 'simple-theme' });

  await process(ctx);

  const content = await contentFor(ctx, '/hello-world/index.html');

  t.true(content.includes('<a href="https://www.facebook.com/sharer/sharer.php?u=http://yoursite.com/hello-world/&t=Hello,%20World!" target="_blank" rel="noopener">Facebook</a>'));
});

test('custom facebook link in ejs template', async t => {
  const ctx = await sandbox({ fixtureName: 'simple-theme' });

  await process(ctx);

  const content = await contentFor(ctx, '/hello-world-custom/index.html');

  t.true(content.includes('<a href="https://www.facebook.com/sharer/sharer.php?u=http://yoursite.com/hello-world-custom/&t=Hello,%20World!" target="_blank" rel="noopener">Share on Facebook, now!</a>'));
});

test('test', async t => {
  const ctx = await sandbox({ fixtureName: 'simple-config' });

  await process(ctx);

  const content = await contentFor(ctx, '/hello-world/index.html');

  t.true(content.includes('<a href="https://twitter.com/intent/tweet?text=READ%20THIS:%20Hello,%20World!%20-%20http://yoursite.com/hello-world/%20(from%20@wololock)" target="_blank" rel="noopener">Share now from post body!</a>'));

  t.true(content.includes('<a href="https://twitter.com/intent/tweet?text=READ%20THIS:%20Hello,%20World!%20-%20http://yoursite.com/hello-world/%20(from%20@wololock)" target="_blank" rel="noopener">Share now from template!</a>'));
});
