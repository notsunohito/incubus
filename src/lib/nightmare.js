import nightmare from 'nightmare';


const {NODE_ENV} = process.env;
let _export;
if(NODE_ENV === 'test') {
    _export = {};
} else {
    _export = nightmare;
}

export default _export;
