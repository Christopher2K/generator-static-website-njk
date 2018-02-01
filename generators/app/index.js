const Generator = require('yeoman-generator');
const mkdirp = require('mkdirp');

module.exports = class extends Generator {
  _greetings() {
    this.log('================================');
    this.log('=== Static website generator ===');
    this.log('================================');
    this.log();
  }

  _ending() {
    this.log('=> Job is done <=')
    this.log('Check the README.md inside your project folder');
  }

  _clientDep(path) {
    return this.npmInstall([
      'jquery'
    ], {'save': true, cwd: path});
  }

  _devDep(path) {
    return this.npmInstall([
      'gulp',
      'gulp-autoprefixer',
      'gulp-babel',
      'gulp-connect',
      'gulp-nunjucks-render',
      'gulp-rename',
      'gulp-sass',
      'nunjucks',
      'babel-preset-env',
      'babel-core'
    ], {'save-dev': true, cwd: path});
  }

  constructor(args, opts) {
    super(args, opts);

    // Set up arguments
    this.argument('name', {
      desc: 'The project\'s name',
      type: String,
      required: true,
      default: 'website'
    });
  }

  initializing() {
    this._greetings();
    mkdirp.sync(this.destinationRoot());
    this.destinationRoot(`${this.contextRoot}/${this.options.name}`);
  }

  configuring() {
    this.log();
    this.log('=> Creating configuration files <=');
        
    this.fs.copy(this.templatePath('.editorconfig'), this.destinationPath('.editorconfig'));
    this.fs.copy(this.templatePath('.gitignore'), this.destinationPath('.gitignore'));
    this.fs.copy(this.templatePath('gulpfile.js'), this.destinationPath('gulpfile.js'));
    this.fs.copyTpl(
      this.templatePath('instructions.md'), 
      this.destinationPath('README.md'),
      { title: this.options.name }
    );
  }

  writing() {
    this.log();
    this.log('=> Creating project boilerplate... <=');
    this.fs.copy(
      this.templatePath('head.njk'),
      this.destinationPath('src/templates/head.njk')
    )

    this.fs.copy(
      this.templatePath('scripts.njk'),
      this.destinationPath('src/templates/scripts.njk')
    );

    this.fs.copy(
      this.templatePath('page.njk'),
      this.destinationPath('src/templates/page.njk')
    );

    this.fs.copyTpl(
      this.templatePath('index.njk'),
      this.destinationPath('src/pages/index.njk'),
      { title: this.options.name }
    );

    this.fs.copy(
      this.templatePath('index.js'),
      this.destinationPath('src/scripts/index.js'),
    );

    this.fs.copy(
      this.templatePath('theme.scss'),
      this.destinationPath('src/styles/theme.scss'),
    );

    mkdirp.sync(`${this.destinationRoot()}/src/img`);
  }
  
  install() {
    this.log();
    this.log('=> Install dependencies <=')
    this._devDep(this.destinationRoot())
    this._clientDep(this.destinationRoot())
    this.fs.extendJSON(this.destinationPath('package.json'), {
      scripts: {
        start: 'gulp',
        compile: 'rm -rf dist && gulp compile'
      }
    });
  }

  end() {
    this._ending();
  }
};
