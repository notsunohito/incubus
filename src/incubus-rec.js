import program    from 'commander';
import Nightmare  from 'nightmare';
import Recorder   from './lib/cli/recorder';
import Inquirer   from './lib/cli/inquirer';


program
    .usage('<dirname> [options]')
    .option('--show', 'Show GUI')
    .option('--openDevTools', 'Open dev tools')
    .parse(process.argv);

const options = {
    nightmare:{
        show: true,
        openDevTools: true,
        titleBarStyle: 'hidden',
        webPreferences:{ partition: 'nopersist' }
    }
};

const nightmare = new Nightmare(options.nightmare);
const recorder = new Recorder(nightmare);


(async ()=> {
    while(true) {
        const inquirer = new Inquirer();
        const name = await inquirer.askCommandName();
        if(name === 'incubus:save') {
            const shouldSave = await inquirer.askShouldSave(recorder.toJSONStr());
            if(shouldSave) await recorder.save('./test.json');
            break;
        }
        const args = await inquirer.askArgs(name);
        await recorder.addPlay({name, args});
    }
})().catch((err)=> {
    console.error(err);
});
