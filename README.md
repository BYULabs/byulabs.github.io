# BYU // LABS

BYU // LABS is Sebastián Iturralde's portfolio and development hub. It showcases
coursework, software projects, and public repositories from the
[BYULabs GitHub organization](https://github.com/byulabs).

The site is built with [Jekyll](https://jekyllrb.com/) and styled with
[Tailwind CSS](https://tailwindcss.com/). Its homepage loads public repository
information from the GitHub API in the browser.

**Live site:** [byulabs.github.io](https://byulabs.github.io/)

## Features

- Responsive portfolio homepage with dark and light themes.
- Repository cards populated from the public BYULabs GitHub repositories.
- Repository sorting by recent activity, stars, or name, with pagination.
- Static-site generation with Jekyll and Tailwind CSS styling.
- GitHub Pages deployment through GitHub Actions on pushes to `main`.

The repository listing requires a network connection to the GitHub API. If the
request fails, the homepage displays an error state instead of the repository
cards.

## Tech stack

- **Site generator:** Jekyll 4
- **Styles:** Tailwind CSS 3, with SCSS support
- **Client-side behavior:** JavaScript
- **Deployment:** GitHub Pages and GitHub Actions

## Getting started

Install Ruby and Bundler, plus Node.js and npm. Then install the project
dependencies from the repository root:

```sh
bundle install
npm install
```

### Run locally

Start the Tailwind watcher and Jekyll development server together:

```sh
npm start
```

The Jekyll site is served at [http://localhost:4000](http://localhost:4000).
The Tailwind watcher rebuilds `assets/css/output.css` when its source files
change. Stop the processes with `Ctrl+C`.

To run either process on its own:

```sh
npm run dev          # Watch and rebuild Tailwind CSS
npm run jekyll:dev   # Serve the site with Jekyll live reload
```

### Build

Rebuild the minified Tailwind stylesheet and generate the static site:

```sh
npm run build
npm run jekyll:build
```

Jekyll writes the generated site to `_site/`. Rebuild the stylesheet after
changing Tailwind inputs or classes; the GitHub Pages workflow builds the
Jekyll site but does not run the npm build.

## Project structure

```text
.
├── _config.yml                 # Jekyll site settings and plugins
├── _includes/                  # Shared head, header, footer, and analytics
├── _layouts/                   # Default, page, post, tag, and category layouts
├── assets/
│   ├── css/
│   │   ├── input.css           # Tailwind entry point
│   │   ├── main.scss           # Jekyll Sass entry point
│   │   └── output.css          # Generated stylesheet used by the site
│   └── js/main.js              # Theme, repository listing, sorting, pagination
├── index.html                  # Portfolio homepage
├── package.json                # Node dependencies and npm scripts
└── Gemfile                     # Ruby and Jekyll dependencies
```

## Deployment

The workflow in `.github/workflows/jekyll-gh-pages.yml` builds the site and
deploys it to GitHub Pages when changes are pushed to `main`. It can also be
run manually from the repository's **Actions** tab.

## Repository listing

The homepage requests public repositories from the GitHub API for the `byulabs`
account. It omits forks and a small list of repositories configured in
`assets/js/main.js`, and displays up to 10 repositories per page. No API token
or backend service is configured.
