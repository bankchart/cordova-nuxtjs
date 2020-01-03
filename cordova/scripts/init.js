const fs = require('fs');

const currPath = "./www/_nuxt";
const newPath = "./www/nuxt";

console.log('Cordova Environment: ' + process);

fs.rename(currPath, newPath, function(err) {
  if (err) {
    console.error(err);
  } else {
    console.info("Successfully renamed the directory.");
  }
});
