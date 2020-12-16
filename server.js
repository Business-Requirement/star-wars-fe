const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const app = express();
const fs = require('fs');

// process config file
const configFile = fs.readFileSync(path.join(__dirname, 'env.config'));
if(configFile) {
  const config = JSON.parse(configFile);
  let active;
  if(process.env.NODE_ENV != '' && config[process.env.NODE_ENV]) {
    active = config[process.env.NODE_ENV];
  } else {
    active = config["local"];
  }
  if(active) {
    let setting = '//This file is auto generate base on env.config.\n\n';
    for(let key in active) {
      setting += `window.${key} = '${active[key]}';\n`;
    }
    let settingDir = path.join(__dirname, "build");
    if (!fs.existsSync(settingDir)){
      fs.mkdirSync(settingDir);
    }
    fs.writeFileSync(path.join(settingDir, "setting.js"), setting);
  }
}

// Serve the static files from the React app
app.use(express.static(path.join(__dirname, "build")));

// All request route to index
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "build/index.html"));
});

const port = process.env.PORT || 3000;
app.listen(port);

console.log(`App listen on port: ${port}`);
