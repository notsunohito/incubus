import Nightmare from './nightmare';
import Executor  from './command/executor';


export default
class Runner {
    constructor(options){
        this.nightmare = new Nightmare(options.nightmare);
    }

    async run(commands) {
        for(let command of commands) {
            await new Executor(command).execute(this.nightmare);
        }
    }

}
