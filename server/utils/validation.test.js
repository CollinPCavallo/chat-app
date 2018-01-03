const expect = require('expect');
const {isRealString} = require('./validation');

describe('isRealString' ,() =>{
    it('should reject non-string values',() => {
        var string = isRealString(123)
        
        expect(string).toBe(false)
    })
    it('should reject string values with only spaces',() => {
        var string = isRealString('    ');

        expect(string).toBe(false)
    })
    it('should allow string wit nonspace characters', () => {
         var string = isRealString('  a b 23  ')
         
         expect(string).toBe(true)
    })
})