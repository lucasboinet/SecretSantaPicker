const SantaPicker = require('../services/santas/models/SantaPicker')

describe('Santas Service', () => {
    const users = [{id: 1}, {id: 4}, {id: 76}, {id: 21}];
    const rules = {
        "UNAUTHORIZED_PAIR": [
            {userId: 1, ofUserId: 4}
        ],
        "MAX_PLAYERS": {value: 12},
        "MIN_PLAYERS": {value: 2}
    };

    let santaPicker = new SantaPicker(rules, users);

    it('SantaPicker: before draw getAlreadyPickedUsers should return an array empty', (done) => {
        const pickableUsers = santaPicker.getAlreadyPickedUsers()

        if (pickableUsers.length === 0) {
            return done()
        }
        done(new Error(`expected length of 0 but got ${pickableUsers.length}`))
    })

    it(`SantaPicker: pickUsers should return an array of length ${users.length}`, (done) => {
        const draw = santaPicker.pickUsers();

        if(draw.length === users.length) {
            return done();
        }
        done(new Error(`expected length of ${users.length} but got ${draw.length}`))
    })

    it(`SantaPicker: after draw getAlreadyPickedUsers should return an array of length ${users.length}`, (done) => {
        const pickableUsers = santaPicker.getAlreadyPickedUsers()

        if (pickableUsers.length === users.length) {
            return done()
        }
        done(new Error(`expected length of ${users.length} but got ${pickableUsers.length}`))
    })
})