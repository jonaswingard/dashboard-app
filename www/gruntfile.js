module.exports = function(grunt) {
  grunt.loadNpmTasks("grunt-ts");
  grunt.initConfig({
    ts: {
      app: {
        src: typescriptFiles,
        dest: 'generated_js/app',
        options: {
          module: 'system',
          moduleResolution: 'node',
          target: 'es5',
          experimentalDecorators: true,
          emitDecoratorMetadata: true,
          noImplicitAny: false
        }
      }
    }
  });

  return grunt.registerTask("default", ["ts"]);
}
