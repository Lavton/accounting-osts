/**
 * Created by 40in on 08.10.14.
 */
var grunt = require('grunt'),
    path = require('path'),
    cons = require('consolidate');

exports.index = function(success, enviroment) {
    var
        cssList = [],
        jsList = [],
        templates = [];


    var cssList = grunt.file.expand('css/*.css');
//    cssList = cssList.map(function(filePath) {
//        return path.relative(config.staticSrc.css, filePath);
//    });

    var templates = [];
    grunt.file.expand('templates/*.us').map(function(filePath) {
        var template = {};
        template.name = path.basename(path.relative('templates', filePath),'.us');
        template.content = grunt.file.read(filePath);
        templates.push(template);
    });
//    var jsList = grunt.file.expand('js/*.js');
    var jsList = [];

    cons.underscore('server/templates/index.us', {
        jsList: jsList,
        cssList: cssList,
        templates: templates,
        title: ''
    }, function(err, html){
        if (err) throw err;
        success(html);
    });
};