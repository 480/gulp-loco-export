'use strict';

var through = require('through2');
var gutil = require('gulp-util');
var unzip = require('unzip');
var PluginError = gutil.PluginError;
var download = require('download');
var fs = require('fs-extra');
var dir = require('node-dir');

// consts
var PLUGIN_NAME = 'gulp-loco-export';

// exporting the plugin main function
module.exports = function(options) {

  if (!options) {
    options = {
      'ext': 'po',
    };
  }

  if (!options.key) {
    throw new PluginError(PLUGIN_NAME, 'localize.biz(Loco) api key is required.');
  }

  return through.obj(function(file, enc, next) {
    if (!file.isBuffer()) return next(null, file);
    var self = this;
    fs.ensureDirSync(options.po_temp_path);
    fs.emptyDirSync(options.po_temp_path);
    download('https://localise.biz:443/api/export/archive/'+options.ext+'.zip?key=' + options.key).then(function(data) {
      // console.log(data);
      fs.writeFileSync(file.path, data);
      fs.createReadStream(file.path)
        .pipe(unzip.Extract({ path: options.po_temp_path }))
        .on('close', function(data){
          dir.subdirs(options.po_temp_path, function(err, subdirs) {
            if (err) throw err;
            // console.log(subdirs);
            fs.copySync(subdirs[1] , options.po_root_path, {overwrite: true});
            fs.removeSync(file.path);
            fs.removeSync(options.po_temp_path);
            self.push(file);
            next();
          });
        });
    });

  });
};
