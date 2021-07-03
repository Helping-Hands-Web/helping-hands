const { listenerCount } = require('cluster');
const hbs = require('hbs');
const path = require('path'); 
let isCurrentUser = false;
const categories = require('../data/categories')

hbs.registerPartials((path.join(__dirname, '../views/partials')))

hbs.registerHelper('active', (options) => {
    const { match, path} = options.hash;
    return path === match ? 'active' : '';
})

hbs.registerHelper('change-how', (options) => {
    const { match, path} = options.hash;
    if (match === path) {
        return '/#how-does-it-work'
    } else {
        return '/'
    }
})

hbs.registerHelper('change-why', (options) => {
    const { match, path} = options.hash;
    if (match === path) {
        return '/#why-helping-hands'
    } else {
        return '/'
    }
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

hbs.registerHelper('isCategorySelected', (category, categories, options) => {
return (categories && categories.indexOf(category.id) !== -1) ? 'checked' : '';
})

