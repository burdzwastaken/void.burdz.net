# void.burdz.net

burdz's minimalist personal landing page. cloud janitor extraordinaire.

## About

this is a minimalist, monospace-styled personal landing page with a simple blog system. the design focuses on simplicity, readability, and a terminal-inspired aesthetic.

## Features

- minimalist monospace design
- dark mode support
- simple blog system with Markdown support
- zero tracking or analytics
- terminal-inspired styling
- keyboard-friendly navigation

## Tech Stack

- HTML/CSS for structure and styling
- minimal yavascript for blog functionality
- markdown for writing blog posts that no one will ever read
- github pages for hosting
- github actions for deployment

## Local Development

```bash
git clone https://github.com/burdzwastaken/void.burdz.net.git
cd void.burdz.net

make serve
```

## Creating Blog Posts

```bash
make new-post
```

after creating a post, add it to the `posts` array in script.js to make it visible on the site.

## Deployment

the site deploys automatically to github pages when changes are pushed to the master branch.

## Directory Structure

```
.
├── .github/             # github liks dis
│   └── workflows/       # automagical deployment configs
├── posts/               # blog posts (.MD files)
├── CNAME                # void.burdz.net
├── .editorconfig        # most important file
├── favicon.svg          # $_
├── .gitignore           # look away git!
├── index.html           # main HTML file
├── LICENSE              # MIT license
├── Makefile             # development helpers
├── README.md            # whoami?
├── script.js            # blog functionality
└── style.css            # am I stylish yet?
```

## License

MIT

## Made with vim because vim > emacs
