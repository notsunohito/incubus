import Constructor from './constructor';

export default
class Executor {
    constructor(command) {
        this.command = command;
    }
    async execute(nightmare) {
        return await Constructor.construct(this.command).execute(nightmare);
    }
}
