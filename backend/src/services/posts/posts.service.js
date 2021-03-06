'use strict';

// Initializes the `posts` service on path `/posts`
const createService = require('feathers-mongodb');
const hooks = require('./posts.hooks');
const filters = require('./posts.filters');

module.exports = function () {
  const app = this;
  const paginate = { default: 500, max: 1000 };
  const mongoClient = app.get('mongoClient');
  const options = { paginate };

  // Initialize our service with any options it requires
  app.use('/posts', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('posts');

  mongoClient.then(db => {
    service.Model = db.collection('posts');
  });

  service.hooks(hooks);

  if (service.filter) {
    service.filter(filters);
  }
};
