'use strict';

const format = '<a href="%link" target="_blank" rel="noopener">%text</a>';

module.exports = function(channel, text, title, permalink, hexo) {
  const config = hexo.config.share_post[channel];

  if (!config) return '';

  const message = encodeURI((config.message || '').replace('%title', title).replace('%link', permalink).replace('%handle', config.handle));

  const link = config.url + '?' + config.query.replace('%link', permalink).replace('%title', encodeURI(title)).replace('%message', message);

  return format.replace('%link', link).replace('%text', text || config.text);
};
