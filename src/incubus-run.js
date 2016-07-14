import program from 'commander';
import Runner  from './lib/runner';


program
    .usage('<dirname> [options]')
    .option('--show', 'Show GUI')
    .option('--openDevTools', 'Open dev tools')
    .parse(process.argv);

const options = {
    nightmare:{
        show: true,
        openDevTools: false,
        titleBarStyle: 'hidden',
        webPreferences:{ partition: 'nopersist' }
    }
};

const MockCommands = [
    {name: 'goto', args: ['http://www.yahoo.co.jp/']},
    {name: 'type', args: ['#srchtxt','Hello World']},
    {name: 'wait', args: [3000]},
    {name: 'end'}
];


(async ()=> {
    await new Runner(options).run(MockCommands);
})().catch((err)=> {
    console.error(err);
});;
