const expect = require('expect');
const {Users} = require('./users');

describe('Users', () => {
    var users;
    beforeEach(() => {
        users = new Users();
        users.users = [{
            id: 1,
            name: 'Collin',
            room: 'A'
        }, {
            id: 2,
            name: 'Brad',
            room: 'A'
        }, {
            id: 3,
            name: 'David',
            room: 'B'
        }, ]
    })
    it('should add a new user', () => {
        var users = new Users();
        var user = {
            id: '123',
            name: 'Collin',
            room: 'Room 1'
        }
        var resUser = users.addUser(user.id, user.name, user.room);

        expect(users.users).toEqual([user]);
    });
    it('should remove a user', () => {
        var userId = 2
        var user = users.removeUser(userId);

        expect(user.id).toBe(2);
        expect(users.users.length).toBe(2);
    });
    it('should not remove a user', () => {
        var userId = 99
        var user = users.removeUser(userId);

        expect(user).toNotExist();
        expect(users.users.length).toBe(3);
    });
    it('should find user', () => {
        var userId = 3
        var user = users.getUser(userId);

        expect(user.id).toBe(userId)
    });
    it('should not find user', () => {
        var userId = '99'
        var user = users.getUser(userId)

        expect(user).toNotExist();
    });
    


    it('should return name for room A', () =>{
        var userList = users.getUserList('A');

        expect(userList).toEqual(['Collin', 'Brad'])
    })
    it('should return name for room B', () => {
        var userList = users.getUserList('B');

        expect(userList).toEqual(['David'])
    })
});