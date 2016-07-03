import Nightmare from 'nightmare';
import Executor  from './command/executor';

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
        this.commands = commands;
    }

    async run() {
        for(let command of this.commands) {
            await new Executor(command).execute(this.nightmare);
        }
    }

    async end() {
        return await this.nightmare.end();
    }
}
