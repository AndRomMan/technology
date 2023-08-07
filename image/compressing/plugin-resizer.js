

// npm i gulp-responsive -D

const responsive = require('gulp-responsive');

// Изменение размеров изображения делать до применения сжатия
function imgResizer() {
  return src('src/img/resize/*.+(jpg|png)')
    .pipe(plumber())
    .pipe(
      responsive(
        {
          '*.jpg': {
            // Resize all JPG images to 200 pixels wide
            width: '50%',
          },
          '*.png': {
            // Resize all PNG images to 50% of original pixels wide
            width: '50%',
          },
          // Resize all images to 100 pixels wide and add suffix -thumbnail
          '*': {
            width: '50%',
            rename: {suffix: '-resized'},
          },
        },
        {
          // Global configuration for all images
          // The output quality for JPEG, WebP and TIFF output formats
          quality: 75,
          // Use progressive (interlace) scan for JPEG and PNG output
          progressive: true,
          // Zlib compression level of PNG output format
          compressionLevel: 6,
          // Strip all metadata
          withMetadata: false,
        }
      )
    )
    .pipe(dest('src/img/resized'));
}
exports.imgResizer = imgResizer;
