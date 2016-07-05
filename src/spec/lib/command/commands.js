import {expect} from 'chai';
import Commands, {Goto} from '../../../lib/command/commands';


describe('Commands', ()=> {
    describe('findByName', ()=> {

        const Goto =  Commands.findByName('goto');

        it('nameに紐づくCommandのconstructorを返す', ()=> {
            expect(new Goto(['url']).name).to.equal('goto');
        });
    });
});


describe('Command', ()=> {

    context('Goto', ()=> {

        describe('name', ()=> {
            it('class名の小文字を返す', ()=> {
                expect(new Goto(['url']).name).to.equal('goto');
            });
        });

        describe('toJSON', ()=> {
            it('{ name:string, args:any[] }を返す', ()=> {
                const {name, args} = new Goto(['url']).toJSON();
                expect(typeof name).to.be.equal('string');
                expect(args).to.be.an.instanceof(Array);
            });
        });

    });
});
