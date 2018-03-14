# Documentation

## Index

+ [Installation](##Installation)
+ [Usage](##Usage)
+ [What Is config.json](##UserSettings)
+ [Deployment](##Deployment)
+ [Features](##Features)

## Installation

Just clone or download the repo and run `npm install` to install all dependencies.

    git clone https://github.com/ShardulNalegave/web-dev-kit.git
    cd web-dev-kit
    npm install


## Usage

First `cd` into your project folder then run `npm start` to start the **Live Server** with **Hot Reloading** and other features.


## User Settings

`config.json` is the file were all the user settings are stored. The default content of this file is :-

````
    {
        "js": "ts or coffee or none",
        "css": "scss or less or none",
        "cssMinify": true
    }
````

`js` field tells the kit what you are using for scripting. It can be none (vanilla JS), coffee (CoffeeScript), ts (TypeScript). 

`css` field tells the kit which preprocessor you are using. It can be none (CSS3), less, scss.

`cssMinify` tells the kit if you want to minify your CSS Files.

## Deployment

It is very easy to deploy your site.

It you want to host your site using GitPages just run `npm run gitpages` in your terminal and web-dev-kit will generate a folder named as **Gitpages-Ready-Site** which will have all the files you will need for deployment.

    npm run gitpages


## Features

1. Hot Reloading For HTML, CSS, LESS, SCSS, JS, PHP Files.
2. Compilers For SCSS And LESS.
3. Minified CSS.
4. GitPages Deployment
5. Automatic `git add .` event for files in src/ (fires when any file in that directory changes)