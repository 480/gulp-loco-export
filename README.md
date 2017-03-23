# gulp-loco-export v0.0.1

> Use urllib to call api to Loco.


## Install

```
npm install --save-dev https://github.com/byseob/gulp-loco-export.git
```


## Example

### import test.pot to loco in gulpfile.js  

```js
var gulp = require('gulp');
var locoImport = require('gulp-loco-import');

var options = {
  'key': '--YOUR--LOCO--API--KEY--',
  'ext': 'pot',
  'index': 'text',
  'ignore-new':false,
  'ignore-existing':true,
  'delete-absent':false,
  'async':false
}

gulp.task('import', function() {
  return gulp.src('test/test.pot')
  .pipe(locoImport(options));
});
```

## options
Option     | Type                             | Description
---------- | -------------------------------- | --------------
key        | ((string))(_required_)           | Loco API Key
ext        | ((string))                       | pot, json, po ... reference from localize.biz

## License

MIT
# gulp-loco-export
