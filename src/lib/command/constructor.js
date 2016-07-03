import Commands from './commands';

export default
class Constructor {
    static construct({name, args}) {
        return new (Function.prototype.bind.call(Commands.findByName(name), null, args));
    }
}
