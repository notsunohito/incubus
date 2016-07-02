#!/usr/bin/env node
var program = require('commander');

program
    .version('1.0.0')
    .command('init', 'Generating manupulating commands file')
    .command('run', 'Run incubus', {isDefault: true})
    .parse(process.argv);

