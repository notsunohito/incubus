import {expect} from 'chai';
import {Goto} from '../../../lib/command/commands';
import Constructor from '../../../lib/command/constructor';


describe('Constructor', ()=> {
    describe('construct', ()=> {

        it('nameに紐づくCommandのインスタンスを返す', ()=> {
            const goto = Constructor.construct({name: 'goto', args: ['url']});
            expect(goto).to.be.an.instanceof(Goto);
        });

    });
});
