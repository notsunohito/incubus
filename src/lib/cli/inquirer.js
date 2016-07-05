import Nightmare   from 'nightmare';
import inquirer    from 'inquirer';
import Descriptors from './descriptors';


export default
class Inquirer {

    async askCommandName() {
        const {name} = await inquirer.prompt(Questions.command);
        return name;
    }

    async askShouldSave(json) {
        console.log(json);
        const {answer} = await inquirer.prompt(Questions.save);
        if(answer === 'no') return false;
        return true;
    }

    async askArgs(name) {
        const descriptor  = Descriptors.findByName(name);
        console.log(name);
        if(!descriptor.hasArgs) return [];
        const args = [];
        const requiredArgs = await this.askRequiredArgs(descriptor);
        Array.prototype.push.apply(args, requiredArgs);
        if(descriptor.args.hasOptions) {
            const optionArgs = await this.askOptionArgs(descriptor);
            Array.prototype.push.apply(args, optionArgs);
        }
        return args;
    }

    async askRequiredArgs(descriptor) {
        const args = [];
        for(let argName of descriptor.args.required) {
            const {required} = await inquirer.prompt({type: 'input', name: 'required', message: `${argName}:`});
            args.push(required);
        }
        return args;
    }

    async askOptionArgs(descriptor) {
        const args = [];
        for(let option of descriptor.args.options) {
            const {optionAnswer} = await inquirer.prompt({type: 'list', name: 'optionAnswer', message: `Do you want to input option argument: ${option} ?`, choices: ['yes', 'no']});
            if(optionAnswer === 'no') continue;
            const {optionArg} = await inquirer.prompt({type: 'input', name: 'optionArg', message: `${option}:`});
            args.push(optionArg);
        }
        return args;
    }
}


const Questions = {
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
    },
    args: {
        required: {

        }
    }
};
