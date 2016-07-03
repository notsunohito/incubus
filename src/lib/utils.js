import fs     from 'fs';
import mkdirp from 'mkdirp';

export function writeFile(filepath, content) {
    return new Promise((resolve, reject)=> {
        fs.writeFile(filepath, content, (err)=> {
            if(err) reject(err);
            resolve();
        });
    });
}

export function mkdir(dirName){
    return new Promise((resolve, reject)=> {
        mkdirp(dirName, (err)=> {
            if(err) reject(err);
            resolve();
        });
    });
}


export default {
    writeFile,
    mkdir
};
