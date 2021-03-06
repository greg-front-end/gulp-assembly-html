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
- _*gulp-autoprefixer*_ for min js files
  - `npm i -save-dev gulp-autoprefixer`
- _*gulp-autoprefixer*_ for add prefixes for older browsers
  - `npm i -save-dev gulp-autoprefixer`
- _*gulp-imagemin*_ for min images
  - `npm i -save-dev gulp-imagemin`
- _*del*_ for remove dist folder after every build
  - `npm i -save-dev del`

// If you have any problems, make sure your current modules are up to date using the command
// npm update. If the issue persists, investigate the issue in the individual project repository.

// undertaker - система регистрации задач
// vinyl - виртуальные файловые объекты
// vinyl-fs - адаптер для вашей локальной файловой системы
// glob-watcher - вотчер файлов
// bach - оркестровка задач с использованием series() и parallel()
// last-run - отслеживает время последнего выполнения задачи
// vinyl-sourcemap - встроенная поддержка sourcemap
// gulp-cli - интерфейс командной строки для взаимодействия с gulp
