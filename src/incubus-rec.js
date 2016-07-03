import program   from 'commander';
import Nightmare from 'nightmare';
import Recorder  from './lib/recorder';


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

const nightmare = new Nightmare(options.nightmare);

(async ()=> {
    const recorder = new Recorder(nightmare);
    await recorder.addPlay({name: 'goto', args: ['http://www.yahoo.co.jp/']});
    await recorder.addPlay({name: 'type', args: ['#srchtxt', 'Recording!']});
    await recorder.addPlay({name: 'wait', args: [3000]});
    await recorder.addPlay({name: 'end'});
    await recorder.save('./test.json');
})().catch((err)=> {
    console.error(err);
});;
