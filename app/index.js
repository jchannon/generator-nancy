'use strict';
var yeoman = require('yeoman-generator');
var yosay = require('yosay');
var chalk = require('chalk');



var AspnetGenerator = yeoman.generators.Base.extend({

    init: function() {
        this.log(yosay('Welcome to the marvelous Nancy generator!'));
    },

    // askFor: function () {
    //     var done = this.async();

    //     // var prompts = [{
    //     //     type: 'list',
    //     //     name: 'type',
    //     //     message: 'What type of application do you want to create?',
    //     //     choices: [
    //     //     {
    //     //         name: 'Console Application',
    //     //         value: 'console'
    //     //     },
    //     //     {
    //     //         name: 'Web Application',
    //     //         value: 'web'
    //     //     }
    //     //     ]
    //     // }];

    //     // this.prompt(prompts, function (props) {
    //     //     this.type = props.type;

    //     //     done();
    //     //     }.bind(this));
    //     },

    askForName: function() {
        var done = this.async();

        var app = 'MyNancyApp';
        var prompts = [{
            name: 'applicationName',
            message: 'What\'s the name of your Nancy ASP.NET application?',
            default: app
        }];
        this.prompt(prompts, function(props) {
            this.applicationName = props.applicationName;

            done();
        }.bind(this));
    },

    retrieveContent: function() {
        var done = this.async();

        this.remote('jchannon', 'aspnet_vnext_samples', function(err, remote) {
            done();
        });
    },

    writing: function() {
        this.copy(this.cacheRoot() + '/jchannon/aspnet_vnext_samples/master/NuGet.config', 'NuGet.config');
        this.mkdir(this.applicationName);
        this.directory(this.cacheRoot() + '/jchannon/aspnet_vnext_samples/master/web', this.applicationName);
    },

    end: function() {
        console.log(this.cacheRoot());
        if (!this.options['skip-install']) {
            this.config.set('skip-install', true)
            //this.installDependencies();
            
            this.spawnCommand('dnu', ['restore']);
        }
    }
});

module.exports = AspnetGenerator;
