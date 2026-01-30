=== FAQ Lite Block ===
Contributors:      Hlib
Tags:              faq, block, accordion, schema, gutenberg
Tested up to:      6.8
Stable tag:        0.1.0
Requires at least: 6.8
Requires PHP:      7.4
License:           GPL-2.0-or-later
License URI:       https://www.gnu.org/licenses/gpl-2.0.html

A lightweight FAQ block for the WordPress block editor with accordion/list display modes and built-in Schema.org (FAQPage) markup.

== Description ==

FAQ Lite Block adds a native Gutenberg block that lets you create FAQ sections directly in the editor. No shortcodes, no custom post types — just a single block.

**Features:**

* **Two display modes** — Accordion (collapsible, one item open at a time) or plain List (all answers visible).
* **Schema.org FAQPage JSON-LD** — automatically generated and embedded in the page source. Helps search engines display rich results.
* **Accessible** — accordion uses `aria-expanded`, `aria-controls`, `role="region"`, and keyboard-navigable buttons.
* **Reorder, add, delete** — manage FAQ items with up/down/delete buttons right in the editor.
* **Rich text answers** — bold, italic, and links inside answers.
* **Optional "first open"** — in accordion mode, optionally expand the first item by default.
* **Supports color, spacing, typography** — uses standard block editor controls.
* **No dependencies** — vanilla JS on the frontend, no jQuery, no extra libraries.

== Installation ==

1. Upload the `faq-lite-block` folder to `/wp-content/plugins/`, or install the plugin through the WordPress plugins screen.
2. Activate the plugin through the "Plugins" screen in WordPress.
3. In the block editor, search for **FAQ** and insert the block.

== Frequently Asked Questions ==

= How do I switch between accordion and list mode? =

Select the FAQ block, open the block settings panel on the right, and choose the display mode under "FAQ Settings".

= Does it output Schema.org markup? =

Yes. Both display modes embed a `<script type="application/ld+json">` block with valid FAQPage structured data. You can verify it with Google's Rich Results Test.

= Can I have multiple FAQ blocks on one page? =

Yes. Each accordion instance works independently, and the frontend script assigns unique IDs to avoid conflicts.

= Does the accordion require jQuery? =

No. The frontend script is vanilla JavaScript with no dependencies.

== Changelog ==

= 0.1.0 =
* Initial release.
* Accordion and list display modes.
* Schema.org FAQPage JSON-LD output.
* Reorder, add, and delete FAQ items in the editor.
* ARIA-compliant accordion with keyboard support.
