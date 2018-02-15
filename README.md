# generator-static-website-njk

This package provide a starter pack for developing a static website. 

## Command
Run `yarn global add generator-static-website-njk` and `yo static-website <website-name>`

## Stack
* [Nunjucks](https://mozilla.github.io/nunjucks/) - Templating
* [Sass](https://sass-lang.com) - Styling
* [Babel](https://babeljs.io) - JavaScript compiler
* [Gulp](https://gulpjs.com) - Make things work together

## Instruction
Run `npm run start` to start a dev server. Your website will be available at [http://localhost:8080](http://localhost:8080)

Run `npm run compile` to only compile your website.

Organize your pages in `src/pages`, write your JS in `src/js`, put your templates in `src/templates` etc...

To add your npm packages, copy them path into the task `move:dependencies` in the gulpfile.

## Issues
When you add external files (in img, fonts), you have to restart the server so gulp can copy them.
