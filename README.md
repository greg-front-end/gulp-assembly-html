# hrach-gulp-start

1. If you've previously installed <b>node.js</b> you can check the version

<ul>
  <li><code>node --version</code></li>
  or
  <li><code>npx --version</code></li>
</ul>

- If they are not installed, follow the instructions <a href="https://nodejs.org/en/">here</a>

2. Install gulp globally

- <code>npm install --global gulp-cli</code>

3. If it's a new project you should create a package.json file in your project directory(This will guide you through giving your project a name, version, description, etc.)

- <code>npm init</code>

4. Install the gulp package in your local folder in your devDependencies

- <code>npm install --save-dev gulp</code>

5. Then create gulpfile.js in your root folder

6. Let's start install plagins:

- And first plagin is _*sass and gulp-sass*_ for forking with scss
  - `npm i --save-dev sass gulp-sass`
- _*gulp-concat*_ for rename and concatination files
  - `npm i --save-dev gulp-concat`
- _*browser-sync*_ for reload browser after some updates in files
  - `npm i -save-dev browser-sync`
  - _*gulp-uglify-es*_ for min js files
  - `npm i -save-dev gulp-uglify-es`
