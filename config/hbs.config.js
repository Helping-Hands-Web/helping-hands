const { listenerCount } = require('cluster');
const hbs = require('hbs');
const path = require('path'); 
let isCurrentUser = false;
const categories = require('../data/categories')
const Service = require('../models/service.model');

hbs.registerPartials((path.join(__dirname, '../views/partials')))

hbs.registerHelper('active', (options) => {
    const { match, path} = options.hash;
    return path === match ? 'active' : '';
})


hbs.registerHelper('isActive', (options) => {
    const {index} = options.hash;
    return Number(index) === 0 ? 'active' : '';
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

hbs.registerHelper('categoryIcon', (category) => {
    const iconClass = categories.find(c => c.id === category).class
    return `<span class="${iconClass}"></span>`;
})

hbs.registerHelper('serviceIsNotOwnedBy', function (options) {
    const { user, service } = options.hash;

    if (user && user._id.toString() != service?.createdBy._id.toString()) {
      return options.fn(this);
    } else {
      return options.inverse(this);
    }
  });

hbs.registerHelper('workIsCreatedBy', function (options) {
    const { user, work } = options.hash;

    if (user && (user._id.toString() == work?.createdBy._id.toString())) {
      return options.fn(this);
    } else {
      return options.inverse(this);
    }
  });

hbs.registerHelper('workIsRequestedBy', function (options) {
    const { user, work } = options.hash;

    if (user && user._id.toString() == work?.requestedBy._id.toString()) {
      return options.fn(this);
    } else {
      return options.inverse(this);
    }
  });

hbs.registerHelper('workIsPending', function(option) {
    const { work } = option.hash;
    if (work.status == "pending") {
        return option.fn(this);
      } else {
        return option.inverse(this);
      }
})