const minimist = require('minimist');

let options = {
    alias: {
        p: "puerto",
    }
}
let argv = minimist(process.argv.slice(2), options)
delete argv.p;
delete argv._;

if (argv.puerto !== 8080) {
    delete argv.puerto;
}

module.exports = {
    PORT: process.env.PORT || 8080
}