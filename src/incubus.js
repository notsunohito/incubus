#!/usr/bin/env node
var program = require('commander');

program
    .version('1.0.0')
    .command('init', 'Generate incubus project directory')
    .command('rec', 'Record operations by Electron GUI')
    .command('run', 'Run incubus', {isDefault: true})
    .parse(process.argv);
