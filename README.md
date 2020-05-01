# hexo-tag-share-post

[![npm version](https://badgen.net/npm/v/hexo-tag-share-post)](https://www.npmjs.com/package/hexo-tag-share-post/access)
[![Build Status](https://travis-ci.org/wololock/hexo-tag-share-post.svg?branch=master)](https://travis-ci.org/wololock/hexo-tag-share-post)
[![Coverage Status](https://coveralls.io/repos/github/wololock/hexo-tag-share-post/badge.svg?branch=master)](https://coveralls.io/github/wololock/hexo-tag-share-post?branch=master)

A small and dependency-free Hexo plugin that adds `share_post` tag and helper for adding text link to share blog post in social media. (Twitter, Facebook, and LinkedIn.)

## Installation

```
npm install hexo-tag-share-post --save
```

## Usage

You can use this plugin to add text social media share links either in blog post (e.g., .md files) or in your blog template (e.g., .ejs files).

### Markdown

Here is how you can add share links inside your blog post body.
Below example uses Markdown file.

```markdown
Share this blog post on {% share_post twitter %}, {% share_post facebook %}, and {% share_post linkedin %}
```

**Result:**

Share this blog post on [Twitter](#), [Facebook](#), and [Linkedin](#)


You can also change the default label by passing the second argument to `share_post` tag.

```markdown
{% share_post twitter "Share on Twitter now!" %} |
{% share_post facebook "Share on Facebook now!" %} |
{% share_post linkedin "Share on Linkedin now!" %}
```

**Result:**

[Share on Twitter now!](#) | [Share on Facebook now!](#) | [Share on Linkedin now!](#)

### EJS (or any other template format)

Here is how you can insert share blog post links in the template source file.
Below examples uses EJS template file.

```
<%- share_post("facebook") %>
```

**Result:**

[Facebook](#)

```
<%- share_post("facebook", "Share on Facebook now!") %>
```

**Result:**

[Share on Facebook now!](#)

## Configuration

You can configure the plugin in `_config.yml` file.

```yaml
share_post:
  facebook:
    url: 'https://www.facebook.com/sharer/sharer.php'
    query: 'u=%link&t=%title'
    text: 'Facebook'

  twitter:
    url: 'https://twitter.com/intent/tweet'
    message: '"%title" %link via @%handle'
    query: 'text=%message'
    text: 'Twitter'
    handle: 'hexojs'

  linkedin:
    url: 'https://www.linkedin.com/sharing/share-offsite/'
    query: 'url=%link&title=%title'
    text: 'LinkedIn'
```

### Setting the default Twitter handle

```yaml
share_post:
  twitter:
    handle: 'wololock'
```

### Changing default Twitter message

By default, the posted message uses the following format:

```
"%title" %link via @%handle
```

You can change it using the following configuration:

```yaml
share_post:
  twitter:
    message: 'READ THIS: %title - %link (via @%handle)'
```

The new format produces message like this one:

```
READ THIS: "Lorem ipsum" - https://example.com/lorem-ipsum (via @wololock)
```

### Changing the default links text

```yaml
share_post:
  facebook:
    text: 'Share on Facebook'

  twitter:
    text: 'Share on Twitter'

  linkedin:
    text: 'Share on LinkedIn'
```
