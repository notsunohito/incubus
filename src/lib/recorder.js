import {writeFile}    from './utils';
import Executor, {Constructor} from './executor';
import Runner from './runner';

export default
class Recorder {
    constructor(nightmare, commands) {
        this.nightmare = nightmare;
        this.commands = commands || [];
    }

    async save(filepath) {
        const jsons = this.commands.map((command)=> Constructor.construct(command).toJSON());
        return await writeFile(filepath, JSON.stringify(jsons));
    }

    add(command) {
        this.commands.push(command);
        return this;
    }

    async addPlay(command) {
        this.add(command);
        await new Executor(command).execute(this.nightmare);
        return this;
    }

    async play() {
        for(let command of this.commands) {
            await new Executor(command).execute(this.nightmare);
        }
    }
}
