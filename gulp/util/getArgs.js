var argv = require("yargs").argv;

// Check for --production flag
var isProduction = !!(argv.production);

// Check for --analytics flag
var isAnalytics = !!(argv.analytics);

module.exports = {
    isProduction,
    isAnalytics
};
