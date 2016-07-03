export default
class Descriptor {
    static findByName(name) {
        switch(name) {
        case 'end':  return End;
        case 'goto': return Goto;
        case 'type': return Type;
        case 'wait': return Wait;
        default: return null;
        }
    }
}

const End =  {
    description: '.end()',
    hasArgs: false
};

const Goto = {
    description: '.goto(url[, headers])',
    hasArgs: true,
    args: {
        required: ['url'],
        options: ['headers'],
        isOverload: false,
        hasOptions: true
    }
};

const Type = {
    description: '.type(selector[, text])',
    hasArgs: true,
    args: {
        required: ['selector'],
        options: ['text'],
        isOverload: false,
        hasOptions: true
    }
};

const Wait = {
    description: '.wait(ms)',
    hasArgs: true,
    args: {
        required: ['ms'],
        isOverload: false,
        hasOptions: false
    }
};
