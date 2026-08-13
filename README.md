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

## Images

All original images — logo, portraits, client logos, service icons, post
covers — were pulled from the Wix CDN and live in `assets/img/`.
`tools/wix-assets.tsv` maps each one back to its original Wix media ID and
notes where it is used; `tools/fetch-assets.sh` re-downloads them all, and
works for as long as the Wix site stays up.

One thing is still missing: **the Crohn's disease PDF**. The download card on
that post shows the filename but is not yet a link. Drop the file at
`assets/files/paediatric-crohns-disease.pdf` and swap the `<span class="doc-name">`
for the commented-out `<a>` directly beneath it.

Table 1 in the bluebird bio post was an image on the Wix site. It is rebuilt
here as a real HTML table — same figures, but selectable, screen-reader
friendly, and readable on a phone.

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

Headings use [Forum](https://fonts.google.com/specimen/Forum), matching the
original. It is self-hosted from `assets/fonts/` (SIL Open Font License 1.1),
so the site makes no third-party requests at all — nothing to go down, and
nothing sent to Google when someone visits.

Body text uses Avenir where available, falling back through a system
sans-serif stack. The original Wix site licensed Avenir LT through Wix; that
licence does not transfer, so it is not self-hosted here.

The footer year updates itself. The HTML carries a hard-coded year so the
footer is still right with JavaScript off, and `assets/js/site.js` refreshes
it on load.
