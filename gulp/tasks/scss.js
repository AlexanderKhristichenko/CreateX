import dartSass from "sass";
import gulpSass from "gulp-sass";
import rename from "gulp-rename";
import cleanCss from "gulp-clean-css";
import webpcss from "gulp-webpcss";
import autoprefixer from "gulp-autoprefixer";
import groupCssMediaQueries from "gulp-group-css-media-queries";

const sass = gulpSass(dartSass);

export const scss = () => {
  return app.gulp
    .src(app.path.src.scss, { sourcemaps: app.isDev })
    .pipe(
      app.plugins.gulpPlumber(
        app.plugins.notify.onError({
          title: "SCSS",
          message: "Error <%= error.message %>",
        }),
      ),
    )

    .pipe(
      sass({
        outputStyle: "expanded",
      }),
    )
    .pipe(groupCssMediaQueries())
    .pipe(
      webpcss({
        webpClass: ".webp",
        noWebpClass: ".no-webp",
      }),
    )
    .pipe(
      autoprefixer({
        grid: true,
        overrideBrowserslist: ["last 3 versions"],
        cascade: true,
      }),
    )
    .pipe(cleanCss())
    .pipe(
      rename({
        extname: ".min.css",
      }),
    )
    .pipe(app.plugins.replace(/@img\//g, "../img/"))
    .pipe(app.gulp.dest(app.path.build.css, { sourcemaps: app.isDev }))
    .pipe(app.plugins.browserSync.stream());
};
