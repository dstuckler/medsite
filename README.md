# medsite

A static website, deployed on [Render](https://render.com).

## How it works

- `index.html` is the homepage. It is a single self-contained file — the styling
  is inside it, and there is no build step.
- Render watches the `main` branch of this repo. Every push to `main` redeploys
  the live site automatically, usually within a minute.

## Editing the site

Easiest route, no tools needed: open `index.html` on GitHub, click the pencil
icon, edit the text, and click **Commit changes**. Render picks it up from there.

The parts meant to be changed are marked with `<!-- EDIT: ... -->` comments.

## Adding more pages

Drop another `.html` file in the root — `about.html` becomes `/about.html` on the
live site. Link to it with `<a href="/about.html">About</a>`.
