//prototype of a simple jest test. For some reason jest did not like the import command. So we used const importing instead.
const sum = require('../prototypes/sum');

test('Tests addition: ', ()=> {
    expect(sum(1, 2)).toBe(3);
});