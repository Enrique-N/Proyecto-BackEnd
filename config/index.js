const minimist = require('minimist');

let options = {
    alias: {
        p: "puerto",
    }
}
let argv = minimist(process.argv.slice(2), options)
delete argv.p;
delete argv._;

if (argv.puerto !== 3000) {
    delete argv.puerto;
}

module.exports = {
    PORT: argv.puerto || 3000
}