# amykenyonmed.com

A static rebuild of [amykenyonmed.com](https://www.amykenyonmed.com), previously
on Wix. Deployed on [Render](https://render.com) from the `main` branch.

Plain HTML and CSS. No build step, no framework, no dependencies.

## Layout

```
index.html                     /            Home
about/index.html               /about       About me
services/index.html            /services    Services
blog/index.html                /blog        Portfolio (writing samples)
contact/index.html             /contact     Contact
post/<slug>/index.html         /post/<slug> Individual writing samples
404.html                                    Not-found page
robots.txt, sitemap.xml
assets/css/site.css                         All styling
assets/js/site.js                           Mobile nav + contact form
assets/img/                                 Images
tools/                                      Asset-recovery helpers
```

URLs match the old Wix site exactly, so existing links and search rankings
carry over.

## Outstanding: images

The original photos and logos live on Wix's CDN (`static.wixstatic.com`), which
was blocked by the network policy of the environment this was built in, so they
are **not yet in the repo**. Every spot expecting one currently shows a
placeholder frame.

To pull them in, from any machine with normal internet access:

```bash
bash tools/fetch-assets.sh
```

Then uncomment the `<img>` tag inside each placeholder — the tags are already
written, commented out, pointing at the correct paths. `tools/wix-assets.tsv`
maps every original Wix asset to its destination and describes where it is used.

Do this before the Wix site is switched off; once it goes, the CDN copies go
with it.

Two other things are stubbed the same way:

- **Client logos** on the homepage render as text wordmarks rather than
  invented logos. `fetch-assets.sh` retrieves the real ones.
- **The Crohn's disease PDF** is linked at
  `/assets/files/paediatric-crohns-disease.pdf`. Drop the file there.

## Contact form

The form has no server behind it. On submit it opens the visitor's email client
with the message pre-filled, addressed to `amy@amykenyonmed.com`.

To use a hosted handler instead (Formspree, Netlify Forms, Basin, etc.), edit
`contact/index.html`:

```html
<form id="contact-form"
      action="https://formspree.io/f/XXXXXXX"
      method="post"
      data-transport="post">
```

Changing `data-transport` away from `mailto` stands the JavaScript down and lets
the form post normally.

## Editing

Text lives directly in the HTML. Edit a file on GitHub, commit to `main`, and
Render redeploys within about a minute.

The header and footer are repeated in each page rather than shared through a
template. Changing navigation means editing every page — a deliberate trade for
having no build step.

## Fonts

Headings use [Forum](https://fonts.google.com/specimen/Forum) from Google Fonts,
matching the original. Body text uses Avenir where available, falling back
through a system sans-serif stack. The original Wix site licensed Avenir LT
through Wix; that licence does not transfer, so it is not self-hosted here.
