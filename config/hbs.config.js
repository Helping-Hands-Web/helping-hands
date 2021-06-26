const { listenerCount } = require('cluster');
const hbs = require('hbs');
const path = require('path'); 
let isCurrentUser = false;

hbs.registerPartials((path.join(__dirname, '../views/partials')))

hbs.registerHelper('active', (options) => {
    const { match, path} = options.hash;
    return path === match ? 'active' : '';
})

hbs.registerHelper('isCurrentUser', function (options) {
    const {myUser, viewUser } = options.hash;
    if(myUser.id === viewUser.id) {
        return options.fn(this);
    } else {
        return options.inverse(this);
    };
});

hbs.registerHelper('isNotCurrentUser', function (options) {
    const {currentUser, viewUser } = options.hash;
    return currentUser.id !== viewUser.id;
});

