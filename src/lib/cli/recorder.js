import {writeFile} from '../utils';
import Constructor from '../command/constructor';
import Executor    from '../command/executor';


export default
class Recorder {
    constructor(nightmare, commands) {
        this.nightmare = nightmare;
        this.commands = commands || [];
    }

    async save(filepath) {
        const jsonStr = this.toJSONStr();
        return await writeFile(filepath, jsonStr);
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

    toJSONStr() {
        const json = this.commands.map((command)=> Constructor.construct(command).toJSON());
        return JSON.stringify(json)
            .replace(/^\[/, '[\n')
            .replace(/\]$/, '\n]\n')
            .replace(/,{/g, ',\n{')
            .replace(/^{/mg, '  {');
    }
}
