/* global hexo */

'use strict';

const defaults = {
  facebook: {
    url: 'https://www.facebook.com/sharer/sharer.php',
    query: 'u=%link&t=%title',
    text: 'Facebook'
  },
  twitter: {
    url: 'https://twitter.com/intent/tweet',
    message: '"%title" %link via @%handle',
    query: 'text=%message',
    text: 'Twitter',
    handle: 'hexojs'
  },
  linkedin: {
    url: 'https://www.linkedin.com/sharing/share-offsite/',
    query: 'url=%link&title=%title',
    text: 'LinkedIn'
  }
};

hexo.config.share_post = {
  facebook: Object.assign(defaults.facebook, (hexo.config.share_post || {}).facebook || {}),
  twitter: Object.assign(defaults.twitter, (hexo.config.share_post || {}).twitter || {}),
  linkedin: Object.assign(defaults.linkedin, (hexo.config.share_post || {}).linkedin || {})
};

const sharePost = require('./lib/sharePost');

hexo.extend.tag.register('share_post', function(args) {
  const channel = args.shift();
  const text = args.shift();
  return sharePost(channel, text, this.title, this.permalink, hexo);
});

hexo.extend.helper.register('share_post', function(channel, text) {
  return sharePost(channel, text, this.page.title, this.page.permalink, hexo);
});
