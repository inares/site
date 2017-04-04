var fs   = require("fs");
var yaml = require("js-yaml");

function loadConfig() {
  var ymlFile = fs.readFileSync( "gulp/config.yml", "utf8" );
  return yaml.safeLoad(ymlFile);
}

module.exports = loadConfig();
