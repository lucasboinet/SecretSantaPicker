class SantaPicker {
    constructor(rules, users) {
        this.rules = rules;
        this.users = users;
        this.draw = [];
    }

    pickUsers() {
        for(const user of this.users) {
            const pickableUsers = this.getPickableUsers(user);
            const randomPick = Math.floor(Math.random() * pickableUsers.length);
            const pickedUser = pickableUsers[randomPick];

            if (pickableUsers.length === 0) {
                throw new Error('Verify your rules condition, they might be too strict !')
            }

            this.draw.push({
                user: user.id,
                offerTo: pickedUser.id
            })

        }

        return this.draw;
    }

    getPickableUsers(user) {
        const notOffererAndNotPicked = this.users.filter((u) => {
            const isOffererUser = this.draw.find((duo) => duo.user === u.id) ? true : false;
            return u.id !== user.id && !isOffererUser && !this.getAlreadyPickedUsers().includes(u.id) && this.respectRules(user, u);
        });

        const notPicked = this.users.filter((u) => {
            return u.id !== user.id && !this.getAlreadyPickedUsers().includes(u.id) && this.respectRules(user, u);
        });

        if (notOffererAndNotPicked.length === 0) {
            return notPicked;
        }

        return notOffererAndNotPicked;
    }

    getAlreadyPickedUsers() {
        return this.draw.map((duo) => duo.offerTo);
    }

    respectRules(offerer, offered) {
        let respectRules = true;
        Object.keys(this.rules).forEach((identifier) => {
            if (respectRules) {
                const rule = this.rules[identifier];
                switch(identifier) {
                    case 'UNAUTHORIZED_PAIR':
                        respectRules = !(rule.map((duo) => duo.userId === offerer.id && duo.ofUserId === offered.id).includes(true));
                        break;
                    case 'MAX_PLAYERS':
                        if (this.users.length > rule.value) {
                            throw new Error(`${identifier}: expected ${rule.value} but go ${this.users.length}, please check your rules definition`);
                        }
                        break;
                    case 'MIN_PLAYERS':
                        respectRules = this.users.length >= rule.value;
                        if (this.users.length < rule.value) {
                            throw new Error(`${identifier}: expected ${rule.value} but go ${this.users.length}, please check your rules definition`);
                        }
                        break;
                    default:
                        throw new Error(`Unknown rule : ${identifier}, please check your rules definition`);
                }
            }
        })
        return respectRules;
    }
}

module.exports = SantaPicker;