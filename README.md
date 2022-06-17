# Frappe Books Tech Blog

This README is a meta-doc so that I have some reference of how to update things
around here, in case I forget, which I will.

## How does this work?

### `hooks.py`

The blog is an SPA and relies on `frappebooks_assist/hooks.py` for routing:

1. `website_redirects` entry because I still haven't figured out how to override the `/blog` path.
2. `website_route_rules` entry because it's an SPA and so does client side routing, it it wasn't for this entry this link: [frappebooks.com/tech/why](https://frappebooks.com/tech/why) would throw a 404.

### Build

Running `yarn build` will build the files and do the following

1. Place _assets_ in `frappebooks_assist/public`
2. Place `tech.html` in `frappebooks_assist/www`

This allows Frappe Framework to serve the SPA.

### Adding a Post

Posts aren't written in markdown, this is by design. They are written using `Vue` and `tailwindcss`. Important stuff about posts

1. Posts are vue files in the `posts` sub directory.
2. Post related css such is added to `index.css` this is to keep things DRY (it can be overridden in other places).
3. First paragraph of the post is entered as data, this is so that a preview can be shown in the list on the _Home_ page, else it can be shown only once the component is rendered by DOM querying.
4. Post heading is added to using a component called `<post-head>`, this shows the _title_, _author_ and _date_.
5. Author name is the Github user id, by design, and an url to the authors profile should be added to the Object `authorUrls` in `helpers.js`.

To create a post:

1. Make a copy of `PostBoilerplate.vue`.
2. Enter the contents, first para in `data`, one off components should be added to the subdir `oneoff`.
3. Update `authorUrls`.
4. Import the post in `posts/index.js` and add it to the exported list.
5. Check using `yarn dev` if the post displays correctly.

## Why Vue why not Vanilla JS

Frappe Books uses Vue for all frontend code, so to support interactivity (to explain some concept such as in the chart's post) Vue is required, lest I spend like an order of magnitue more time writing Vanilla JS to compose and render complex components.
