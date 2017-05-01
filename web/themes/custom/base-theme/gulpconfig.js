module.exports = {
  styles: {
    srcPath: "src/styles",
    srcFiles: "src/styles/**/*",
    srcMainFiles: ["src/styles/*.scss", "!src/styles/_*.scss"],
    dest: "dist/css",
    vendor: {
      vendorFiles: [],
      dest: "dist/css",
      font: {
        files: [
          'src/fonts/*'
        ],
        dest: "dist/fonts"
      }
    }
  },

  js: {
    src: "src/js",
    srcFiles: [
      'node_modules/bootstrap-sass/assets/javascripts/bootstrap.min.js',
      "src/js/main.js"
    ],
    dest: "dist/js"
  },

  images: {
    standard: {
      src: "src/img/*",
      dest: "dist/img"
    },
    inline: {
      src: "src/mockups/img-inline/*",
      dest: "dist/img-inline"
    },
    drupal: {
      srcDir: "../../../sites/default/files/",
      srcGlob: "**/*.{png,gif,jpg,svg}"
    }
  },

  serviceworker: {
    initScript: {
      src: "src/js/sw/sw-init.js",
      dest: "dist/js/"
    },
    dest: {
      fileName: "service-worker.js",
      relativePath: "../../../",
      absolutePath: "/themes/custom/base-theme"
    },
    importScripts: {
      src: [
        "node_modules/sw-toolbox/sw-toolbox.js",
        "src/js/sw/sw-runtime-caching.js"
      ],
      dest: "dist/js"
    },
    staticFileGlobs: [
      'dist/img/**/*',
      'dist/favicon.ico'
    ]
  }

};
