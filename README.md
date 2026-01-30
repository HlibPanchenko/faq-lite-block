# FAQ Lite Block

A lightweight FAQ block for the WordPress block editor with accordion/list display modes and built-in Schema.org (FAQPage) markup.

## Features

- **Two display modes** — Accordion (collapsible, one item open at a time) or plain List (all answers visible)
- **Schema.org FAQPage JSON-LD** — automatically generated and embedded in the page source for rich search results
- **Accessible** — `aria-expanded`, `aria-controls`, `role="region"`, keyboard-navigable buttons
- **Reorder, add, delete** — manage FAQ items with up/down/delete buttons in the editor
- **Rich text answers** — bold, italic, and links
- **Optional "first open"** — expand the first accordion item by default
- **Color, spacing, typography** — standard block editor controls
- **No dependencies** — vanilla JS on the frontend, no jQuery

## Requirements

- WordPress 6.8+
- PHP 7.4+

## Installation

1. Upload the `faq-lite-block` folder to `/wp-content/plugins/`
2. Activate the plugin in **Plugins → Installed Plugins**
3. In the block editor, search for **FAQ** and insert the block

## Usage

1. Add the **FAQ** block in the editor
2. Type your questions and answers
3. Use the **up/down/delete** buttons on each item to reorder or remove
4. Click **Add FAQ Item** to add more entries
5. In the block settings sidebar, choose **Accordion** or **List** display mode

## Schema.org

Both modes output a `<script type="application/ld+json">` block with valid [FAQPage](https://schema.org/FAQPage) structured data. Verify with [Google Rich Results Test](https://search.google.com/test/rich-results).

## Development

```bash
npm install
npm start    # watch mode
npm run build  # production build
```

## License

GPL-2.0-or-later
