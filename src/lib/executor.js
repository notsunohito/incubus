import Commands from './commands';

export default
class Executor {
    constructor(command) {
        this.command = command;
    }
    async execute(nightmare) {
        return await Constructor.construct(this.command).execute(nightmare);
    }
}

export 
class Constructor {
    static construct({name, args}) {
        return new (Function.prototype.bind.call(Commands.findByName(name), null, args));
    }
}
