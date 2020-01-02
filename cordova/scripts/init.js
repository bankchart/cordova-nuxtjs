const fs = require('fs');

const currPath = "./www/_nuxt";
const newPath = "./www/nuxt";
 
fs.rename(currPath, newPath, function(err) {
  if (err) {
    console.log(err);
  } else {
    console.log("Successfully renamed the directory.");
  }
});
