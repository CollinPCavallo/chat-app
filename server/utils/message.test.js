const expect = require('expect');

var {generateMessage, generateLocationMessage} = require('./message');

describe('generateMessage', () => {
    it('should generate correct message object', () => {
        var from = 'David';
        var text = 'Some message';
        var message = generateMessage(from, text);

    
        expect(message.createdAt).toBeA('number')
        expect(message).toInclude({from,text})
    });
});

describe('generateLocationMessage', () =>{
    it('should genereate correct location object' ,() => {
        var from = 'collin'
        var lat = 123
        var long = 321
        var locationMessage = generateLocationMessage(from, lat, long);

        expect(locationMessage.url).toBe('https://www.google.com/maps?q=123,321')
        expect(locationMessage).toInclude({from})
        expect(locationMessage.createdAt).toBeA('number')
    })
})
