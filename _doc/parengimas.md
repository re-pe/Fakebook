<!-- markdownlint-disable no-inline-html -->

# Laravelis su Sanctum API ir React'u

Veiksmai, atlikti kuriant paruoštuką

## Backendas

### `Laravel'io` instaliavimas

  ```yaml
  composer create-project laravel/laravel Fakebook
  cd Fakebook
  mv README.md README-laravel.md
  echo '# Fakebook' > README.md
  ```

### git repozitorijos inicializavimas

  ```yaml
  git init
  git add .
  git commit -m 'Initial commit'
  git branch -m master main
  ```

### git failų formatavimo nuostatos

- Pakeisti `.gitattributes` failą:

  ```yaml
  echo -e '* text eol=lf
  *.* text eol=lf
  *.jpg -text
  *.jpeg -text
  *.png -text
  *.ico -text
  *.pdf -text
  CHANGELOG.md export-ignore' > .gitattributes
  ```

### git failų ignoravimo nuostatos

- Atidaryti [gitignore.io](https://www.toptal.com/developers/gitignore?templates=laravel,react,node,vscode)

- Spausti `Create`

- Išsaugoti į failą `.gitignore`

- `.gitignore` failo pabaigoje pridėti papildymą:

  ```yaml
  echo -e 'public
  .project
  *_.*
  *.*_
  *_' >> .gitignore
  ```

### phpcs

- Jei paketas nėra įrašytas, įrašyti į globalinę erdvę

  ```yaml
  composer global require squizlabs/php_codesniffer
  ```

- Šakniniame kataloge sukurti failą `phpcs.xml` ir išsaugoti jame šias nuostatas:

  ```xml
  <?xml version="1.0" ?>
  <ruleset name="PSR2">
      <description>The PSR2 coding standard.</description>
      <rule ref="PSR2" />
      <file>app/</file>
      <exclude-pattern>vendor</exclude-pattern>
      <exclude-pattern>resources</exclude-pattern>
      <exclude-pattern>database/</exclude-pattern>
      <exclude-pattern>storage/</exclude-pattern>
      <exclude-pattern>node_modules/</exclude-pattern>
      <exclude-pattern>**/*_.*</exclude-pattern>
      <exclude-pattern>**/*.*_</exclude-pattern>
  </ruleset>
  ```

### [laravel-debugbar](https://github.com/barryvdh/laravel-debugbar)

- Diegimas ir konfigūracijos viešinimas

  ```yaml
  composer require barryvdh/laravel-debugbar --dev
  php artisan vendor:publish --provider="Barryvdh\Debugbar\ServiceProvider"
  ```

### `public` katalogo turinio perkėlimas į `resources/_public`

- Perkelti failus

  ```yaml
  mkdir resources/_public
  mv public/* resources/_public
  mv public/.htaccess resources/_public
  ```

- Įtraukti `public` katalogą į .gitignore

  ```yaml
    echo -e '\npublic' >> .gitignore
  ```

- Automatiškai kopijuoti `resources/_public` ir `resources/img` katalogų turinį paleidimo metu

  - Sukurti katalogą `resources/img`

    ```yaml
      mkdir resources/img
    ```

  - Pridėti konfigūracines nuostatas į `webpack.mix.js` failą:

  ```js
  <...>
  mix
      .copyDirectory('resources/_public', 'public')
      .copyDirectory('resources/img', 'public/img')
      <...>
  ```

### Įkelti reikalingus paketus

  ```yaml
  composer install
  composer update
  npm install
  npm run dev
  ```

#### `composer start` komanda lygiagrečiam frontendo ir backendo iškvietimui

- Įdiegti `veewee/composer-run-parallel`

  ```yaml
  composer require --dev veewee/composer-run-parallel
  ```

- `composer.json` failo `scripts` dalyje pridėti:

  ```json
  <...>
  "scripts": {
    <...>,
    "backend": [ "@php artisan serve" ],
    "frontend": [ "npm run watch-poll" ],
  },
  <...>
  ```

## Frontendas

### `Bootstrap'as`

  ```yaml
  npm install bootstrap
  ```

### `React'as`

- Įdiegti `react` paketą su priedais

  ```yaml
  npm install react react-dom react-router-dom react-context-devtool react-bootstrap react-router-bootstrap
  ```

- Konfigūruoti `webpack.mix.js` failą:

  ```js
  <...>
  mix
      <...>
      .react()
      <...>;
  ```

### React'o programuotojo įrankiai

- Chrome įdiegti [React Developer Tools](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi) plėtinį

- Chrome įdiegti [React Context DevTool](https://chrome.google.com/webstore/detail/react-context-devtool/oddhnidmicpefilikhgeagedibnefkcf) plėtinį

### ESLint

- Įdiegti `eslint` ir `eslint-webpack-plugin`:

  ```yaml
  npm install eslint --save-dev
  npm install eslint-webpack-plugin --save-dev
  ```

- Sukurti konfiguraciją, atsakant į klausimus

  ```yaml
  ./node_modules/.bin/eslint --init
  ```

  - How would you like to use ESLint?\
    ✔ To check syntax, find problems, and enforce code style

  - What type of modules does your project use?\
    ✔ JavaScript modules (import/export)

  - Which framework does your project use?\
    ✔ React

  - Does your project use TypeScript?\
    ✔ No

  - Where does your code run?\
    ✔ Browser\
    ✔ Node

  - How would you like to define a style for your project?\
    ✔ Use a popular style guide

  - Which style guide do you want to follow?\
    ✔ Airbnb: [https://github.com/airbnb/javascript](https://github.com/airbnb/javascript)

  - What format do you want your config file to be in?\
    ✔ JSON

  - Would you like to install them now with npm?\
    ✔ Yes

- Pridėti taisykles į `.eslintrc.json` failą

  ```json
  <...>,
  "rules": {
      "function-paren-newline": ["error", "consistent"],
      "indent": ["error", 4],
      "max-len": ["error", {
          "code": 120,
          "ignoreComments": true
      }],
      "object-curly-newline": ["error", {
          "ObjectExpression": {
              "consistent": true
          },
          "ObjectPattern": {
              "consistent": true
          },
          "ImportDeclaration": {
              "consistent": true
          },
          "ExportDeclaration": {
              "consistent": true
          }
      }],
      "react/jsx-indent": ["error", 4],
      "react/jsx-indent-props": ["error", 4],
      "react/prop-types": "off"
    },
  "ignorePatterns": [
      "temp.js",
      "**/vendor/**/*.js",
      "*.min.js",
      "**/*.code-workspace",
      ".vscode/*"
  ],
  "overrides": [{
      "files": [
          "*.test.jsx",
          "*.spec.jsx",
          "*.test.js",
          "*.spec.js"
      ],
      "rules": {
          "no-undef": "off"
      }
  }]
  ```

- Įtraukti `eslint-webpack-plugin` konfigūracijos nuostatas į `webpack.mix.js` failą:

  ```js
  <...>
  const mix = require('laravel-mix');
  const ESLintPlugin = require('eslint-webpack-plugin'); // +++

  <...>
  mix
      .webpackConfig({ plugins: [new ESLintPlugin()] })
      <...>
  ```

### Aplinkos kintamųjų įkėlimas į frontendą

- Įdiegti dotenv:

  ```yaml
  npm install dotenv
  ```

- Įjungti `webpack.mix.js` faile:

  ```js
  const ESLintPlugin = require('eslint-webpack-plugin');
  require('dotenv').config();
  const webpack = require('webpack');

  <...>

  const dotEnvPlugin = new webpack.DefinePlugin({
      'process.env': {
          APP_NAME: JSON.stringify(process.env.APP_NAME || 'Default app name'),
          NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'development'),
      },
  });

  mix
      .webpackConfig({ plugins: [new ESLintPlugin(), dotEnvPlugin] })
      <...>
      .react();
  ```

### Automatinis frontendo atnaujinimas naršyklėse

(tik turint pakankamai galingą kompiuterį)

- Įdiegti `browser-sync`

  ```yaml
  npm install --save-dev browser-sync
  ```

- Įjungti `webpack.mix.js` faile:

  ```js
  <...>
  const { DOMAIN_NAME, SERVER_PORT } = process.env;

  mix
      <...>
      .react()
      .browserSync({ proxy: `${DOMAIN_NAME}:${SERVER_PORT}`, ui: false, open: 'external', host: DOMAIN_NAME });
  ```

Atnaujinamas tinklalalpis matomas `http://fb.local:3000` adresu

### Priėjimas prieš išeities failų naršyklėje debuginimui

- Įjungti `webpack.mix.js` faile

  ```js
  <...>
  mix
      <...>
      .sourceMaps(false, 'source-map')
      <...>
  ```

## Sanctum

- Diegimas, konfigūracijos viešinimas, migracija

  ```yaml
  composer require laravel/sanctum
  php artisan vendor:publish --provider="Laravel\Sanctum\SanctumServiceProvider"
  php artisan migrate
  ```

- `app/Http/Kernel.php` pridėti

  ```php
  'api' => [
      \Laravel\Sanctum\Http\Middleware\EnsureFrontendRequestsAreStateful::class,
      'throttle:api',
      \Illuminate\Routing\Middleware\SubstituteBindings::class,
  ],
  ```
