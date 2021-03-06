---
title: Panini
description: A flat file compiler that powers our prototyping template. Create pages with consistent layouts and reusable partials with ease.
library:
  github: https://github.com/zurb/panini
  docs: https://github.com/zurb/panini
---

{{{{raw}}}}

If you've ever created a static site, maybe you had five pages that all shared the same header and footer. You create your first page, and then copy and paste the common elements to the next page. But now if you need to make a change to the header, the change has to be made across multiple files. You can do this with Emails in your campaigns too!

Panini is a flat file compiler that uses the concepts of templates, pages, and partials&mdash;powered by the [Handlebars](https://handlebarsjs.com/) templating language&mdash;to streamline the process of creating static prototypes.

Our [prototyping template](https://github.com/zurb/foundation-emails-template) uses Panini, along with a host of other tools for processing Sass and images, to make creating optimized templates easy. It's already been configured to utilize all of the features below, but if you want to learn the specifics of how to configure the library, head over to the [Panini GitHub page](https://github.com/zurb/panini).

---

## Basics: Templates & Pages

A **template** is a common layout that every page in your design shares. It's possible to have multiple templates, but generally you'll only need one, and a page can only use one template. In the prototyping template, the default layout is found under `src/layouts/default.html`.

Here's what a basic template might look like:

```handlebars
<html>
  <head>
    <title>Definitely an Email!</title>
  </head>
  <body>
    <header class="header"><!-- ... --></header>
    {{> body}}
    <footer class="footer"><!-- ... --></footer>
  </body>
</html>
```

In the middle of the HTML is a bit of Handlebars code: `{{> body}}`. This is where the pages you write are injected when Panini runs, giving you a series of complete HTML files at the end.

The **pages** make up the guts of your layouts. These files will just have the middle section of the design, since the layout already covers the top and bottom. The prototyping template includes one blank page to get you started, under `src/pages/index.html`.

A basic page might look like this:

```html
<h1>Page Title</h1>
<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Praesentium ducimus eligendi, reiciendis corporis quam facere quaerat qui, aspernatur molestiae velit, vero ea quisquam laborum corrupti repudiandae totam, at aliquam esse.</p>
```

Note that there's no `<html>` or `<body>` tags, and no header or footer. This code will be injected into the `{{> body}}` declaration when Panini assembles your pages.

In the prototyping template, these finished files are compiled into a standalone folder called `dist` (short for "distribution"), which also includes your processed CSS, JavaScript, and images. This folder can easily be uploaded to any ESP (Email Service Provider).

---

## Partials

Partials are a feature of Handlebars which allow you to inject HTML anywhere in a page or layout. They're really useful when you need to repeat certain chunks of code throughout your pages, or to keep individual files from getting too cluttered with HTML.

Here's an example of a layout file that divides its key sections into partials:

```handlebars
<html>
  <head>
    <title>Definitely STILL an Email!</title>
  </head>
  <body>
    {{> header}}
    {{> body}}
    {{> footer}}
  </body>
</html>
```

The `{{> }}` syntax tells Handlebars to look for an HTML file with that name, and inject it at that place. In this example, we have files called `header.html`, `navigation.html`, and `footer.html`. In the prototyping template, these files all exist within `src/partials`.

---

## Page Variables

Pages have a few built-in variables, which can be used within the page template itself, or within a layout or partial being used in tandem with the page.

### page

Prints the name of the current page, without its original file extension. In the below example, if the page is `index.html`, `{{page}}` will become `index`.

```handlebars
<p>You are here: {{page}}</p>
```

### root

Use `{{root}}` before a file path to make sure it works no matter what folder the current page is in.

For example, a path to an external CSS file will need to be different if the current page is at the root level of your site, or in a sub-folder.

Here's how you'd use it with a `<link>` tag:

```handlebars
<link rel="stylesheet" href="{{root}}assets/css/app.css">
```

If the page is `index.html`, the path will look like this:

```html
<link rel="stylesheet" href="assets/css/app.css">
```

If the page is `folder/page.html`, the path will look like this:

```html
<link rel="stylesheet" href="../assets/css/app.css">
```

The `../` is added only on pages in a sub-folder, so the CSS can still be properly loaded.

---

## Helpers

Helpers are special functions that manipulate content on the page. In addition to [Handlebars's built-in helpers](https://handlebarsjs.com/builtin_helpers.html), Panini includes a few custom helpers and you can add your own.

### ifpage

Displays the HTML inside the helper only on specific pages. In the below example, the HTML inside the helper will only show up on the `index.html` page.

```handlebars
{{#ifpage 'index'}}
  <p>This is definitely the Index page.</p>
{{/ifpage}}
```

You can also check for multiple pages. If *any* name in the list matches the current page, the HTML will appear.

```handlebars
{{#ifpage 'index' 'about'}}
  <p>This is definitely either the Index or About page.</p>
{{/ifpage}}
```

### unlesspage

The opposite of `#ifpage`, `#unlesspage` will only display the HTML inside of it if the current page is *not* in the parameters.

```handlebars
{{#unlesspage 'index'}}
  <p>This is definitely <em>not</em> the Index page.</p>
{{/unlesspage}}
```

### repeat

Repeats the content inside of it `n` number of times. Use this to easily print lots of duplicate HTML in a prototype.

```handlebars
<ul>
  {{#repeat 5}}
  <li>Five hundred ninety-nine US dollars</li>
  {{/repeat}}
</ul>
```

### markdown

Converts Markdown into HTML.

```handlebars
{{#markdown}}
# Heading 1
Lorem ipsum [dolor sit amet](https://html5zombo.com), consectetur adipisicing elit. Nam dolor, perferendis. Mollitia aut dolorum, est amet libero eos ad facere pariatur, ullam dolorem similique fugit, debitis impedit, eligendi officiis dolores.
{{/markdown}}
```

### Custom Helpers

If you don't see the right helper, you can write your own. Add a javascript file to 'src/helpers', restart npm, then call it in your templates.

```javascript
// Example file src/helpers/bold.js
module.exports = function(options) {
  // options.fn(this) = Handlebars content between {{#bold}} HERE {{/bold}}
  var bolder = '<strong>' + options.fn(this) + '</strong>';
  return bolder;
}
```
Then in your projects call your custom `{{#bold}}` helper

```handlebars
{{#bold}}ideas{{/bold}}
```

---

## Custom Data

Custom data can be added to your pages. This data can then be inserted into your HTML through Handlebars. There are two ways to add data to a project.

To add variables to a specific page only, add it at the top of the page's HTML as a [Front Matter](https://jekyllrb.com/docs/frontmatter/) block. Let's say the below content is inside `src/pages/index.html`.

```html
---
title: Page Title
description: Lorem ipsum.
---

<!-- The rest of your HTML is down here. -->
```

Now, you can insert the values of these variables into the `index.html` page, *or* the `default.html` layout. To insert a variable, wrap the name of the variable in double curly braces, like so:

```handlebars
<h1>{{ title }}</h1>
```

Variables can also be added globally by creating an external JSON or YML file, and adding it to the `src/data` folder in your project. Let's create a file called `breakfast.yml`:

```yaml
- eggs
- bacon
- toast
```

Panini will load in the contents of this YML file as a variable called `{{ breakfast }}`. Because it's an array, we can loop through it using Handlebars's `{{#each}}` helper:

```handlebars
<ul class="breakfast-items">
  {{#each breakfast}}
    <li>{{ this }}</li>
  {{/each}}
</ul>
```

This code will print three `<li>`s, one for each item in the file.

## Tutorials

[Staying D.R.Y. with Panini](https://zurb.com/university/lessons/staying-d-r-y-with-panini)
Panini comes with tons of Handlebars helpers built in, like a repeat helper or markdown parser, but in this lesson we???ll take a look at creating a custom month/year helper for an HTML email.


{{{{/raw}}}}
