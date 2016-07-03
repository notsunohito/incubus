import program    from 'commander';
import inquirer   from 'inquirer';
import Nightmare  from 'nightmare';
import Recorder   from './lib/recorder';
import Descriptors from  './lib/command/descriptors';


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


const inq = {
    command: {
        type: 'list',
        name: 'name',
        message: 'Choose command',
        choices: ['goto', 'type', 'wait', 'end', 'incubus:save']
    },
    save: {
        type: 'choice',
        name: 'answer',
        message: 'Do you want to save this?(yes/no)',
        choices: ['yes', 'no']
    }
};

const nightmare = new Nightmare(options.nightmare);
const recorder = new Recorder(nightmare);

(async ()=> {
    while(true) {
        const {name} = await inquirer.prompt(inq.command);
        if(name === 'incubus:save') {
            console.log(recorder.toJSONStr());
            const {answer} = await inquirer.prompt(inq.save);
            if(answer === 'no') break;
            await recorder.save('./test.json');
            break;
        }

        const descriptor = Descriptors.findByName(name);
        const {description, hasArgs} = descriptor;
        const args = [];
        if(hasArgs) {
            console.log(`command description:${description}`);
            for(let argName of descriptor.args.required) {
                const {required} = await inquirer.prompt({type: 'input', name: 'required', message: `${argName}:`});
                args.push(required);
                if(descriptor.args.hasOptions) {
                    const options = descriptor.args.options;
                    for(let option of options) {
                        const {optionAnswer} = await inquirer.prompt({type: 'list', name: 'optionAnswer', message: `Do you want to input option argument: ${option} ?`, choices: ['yes', 'no']});
                        if(optionAnswer == 'no') continue;
                        const {optionArg} = await inquirer.prompt({type: 'input', name: 'optionArg', message: `${option}:`});
                        args.push(optionArg);
                    }
                }
            }
        }
        await recorder.addPlay({name: name, args: args});
    }

})().catch((err)=> {
    console.error(err);
});
