import Nightmare from 'nightmare';
import Commands  from './commands';

const options = {
    nightmare:{
        show: true,
        openDevTools: false,
        titleBarStyle: 'hidden',
        webPreferences:{ partition: 'nopersist' }
    }
};


export default
class Runner {
    constructor(commands){
        this.nightmare = new Nightmare(options.nightmare);
        this.commands = new Parser(commands).parse();
    }

    async run() {
        for(let command of this.commands) {
            await command.execute(this.nightmare);
        }
    }
}

export
class Parser {
    constructor(commands) {
        this.commands = commands;
    }
    parse() {
        return this.commands.map(({name, args})=> {
            const ctor = Commands.findByName(name);
            return new (Function.prototype.bind.call(ctor, null, args));
        });
    }
}
