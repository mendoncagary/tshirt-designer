# `tshirt-designer` — Online app for designing tshirts

This is an application for designing custom tshirts developed in [AngularJS][angularjs]. You can use it
to quickly design Tshirts using the online editor.

The application contains features like:
1. Uploading, scaling and roating images
2. Inserting, scaling and rotating text
3. Changing shirt colour
4. Saving Current Designs as well as Loading previous saved designs
5. Undo and Redo option

## Getting Started

To get you started you can simply clone the `tshirt-designer` repository and install the dependencies:

### Prerequisites

You need git to clone the `tshirt-designer` repository. You can get git from [here][git].

You must LAO have Node.js and its package manager (npm) installed. You can get them from [here][node].

### Clone `tshirt-designer`

Clone the `tshirt-designer` repository using git:

```
git clone https://github.com/mendoncagary/tshirt-designer.git
cd tshirt-designer
```

### Install Dependencies

We have preconfigured `npm` to automatically run `bower` so we can simply do:

```
npm install
```

Behind the scenes this will also call `bower install`. After that, you should find out that you have
two new folders in your project.

* `node_modules` - contains the npm packages for the tools we need
* `app/bower_components` - contains the Angular framework files

*Note that the `bower_components` folder would normally be installed in the root folder but
`angular-seed` changes this location through the `.bowerrc` file. Putting it in the `app` folder
makes it easier to serve the files by a web server.*

### Run the Application

We have preconfigured the project with a simple development web server. The simplest way to start
this server is:

```
npm start
```

Now browse to the app at [`localhost:8000/index.html`][local-app-url].




[angularjs]: https://angularjs.org/
[bower]: http://bower.io/
[git]: https://git-scm.com/
[http-server]: https://github.com/indexzero/http-server
[jasmine]: https://jasmine.github.io/
[jdk]: https://wikipedia.org/wiki/Java_Development_Kit
[jdk-download]: http://www.oracle.com/technetwork/java/javase/downloads
[karma]: https://karma-runner.github.io/
[local-app-url]: http://localhost:8000/index.html
[node]: https://nodejs.org/
[npm]: https://www.npmjs.org/
[protractor]: http://www.protractortest.org/
[selenium]: http://docs.seleniumhq.org/
[travis]: https://travis-ci.org/
[travis-docs]: https://docs.travis-ci.com/user/getting-started
