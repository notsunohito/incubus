export default
class Commands {
    static findByName(name) {
        return [End, Goto, Type, Click, Wait].find((ctor)=> {
            return ctor.name.toLowerCase() === name;
        });
    }
}

export
class Command {
    constructor(args) {
        this.args = args;
    }

    async execute(nightmare) {
        throw new Error('Must be overridden');
    }
    
    get name() {
        return this.constructor.name.toLowerCase();
    }

    toJSON() {
        return {
            name: this.name,
            args: this.args
        };
    }
}

export
class End extends Command {
    async execute(nightmare) {
        return await nightmare.end();
    }
}

export
class Goto extends Command {
    constructor(args) {
        super(args);
        this.url = this.args[0];
    }
    async execute(nightmare) {
        return await nightmare.goto(this.url);
    }
}

export
class Back extends Command {
    async execute(nightmare) {
        return await nightmare.back();
    }
}

export
class Forward extends Command {
    async execute(nightmare) {
        return await nightmare.forward();
    }
}

export
class Refresh extends Command {
    async execute(nightmare) {
        return await nightmare.refresh();
    }
}

export
class Click extends Command {
    constructor(args) {
        super(args);
        this.selector = this.args[0];
    }
    async execute(nightmare) {
        return await nightmare.click(this.selector);
    }
}

export
class Mousedown extends Command {
    constructor(selector) {
        super();
        this.selector = selector;
    }
    async execute(nightmare) {
        return await nightmare.mousedown(this.slector);
    }
}

export
class Type extends Command {
    constructor(args) {
        super(args);
        this.selector = this.args[0];
        this.text = this.args[1];
    }
    async execute(nightmare) {
        return await nightmare.type(this.selector, this.text);
    }
}

export
class Insert extends Command {
    async execute(nightmare) {

    }
}

export
class Check extends Command {
    async execute(nightmare) {

    }
}

export
class Uncheck extends Command {
    async execute(nightmare) {

    }
}

export
class Select extends Command {
    async execute(nightmare) {

    }
}

export
class ScrollTo extends Command {
    async execute(nightmare) {

    }
}

export
class Viewport extends Command {
    async execute(nightmare) {

    }
}

export
class Inject extends Command {
    async execute(nightmare) {

    }
}

export
class Evaluate extends Command {
    async execute(nightmare) {

    }
}

export
class Wait extends Command {
    constructor(args) {
        super(args);
    }
    async execute(nightmare) {
        return await nightmare.wait.apply(nightmare, this.args);
    }
}

export
class Header extends Command {
    async execute(nightmare) {

    }
}
