/**
 * This file is where you define your application routes and controllers.
 *
 * Start by including the middleware you want to run for every request;
 * you can attach middleware to the pre('routes') and pre('render') events.
 *
 * For simplicity, the default setup for route controllers is for each to be
 * in its own file, and we import all the files in the /routes/views directory.
 *
 * Each of these files is a route controller, and is responsible for all the
 * processing that needs to happen for the route (e.g. loading data, handling
 * form submissions, rendering the view template, etc).
 *
 * Bind each route pattern your application should respond to in the function
 * that is exported from this module, following the examples below.
 *
 * See the Express application routing documentation for more information:
 * http://expressjs.com/api.html#app.VERB
 */

const keystone = require('keystone');
const middleware = require('./middleware');
const importRoutes = keystone.importer(__dirname);

// Common Middleware
keystone.pre('routes', middleware.initLocals);
keystone.pre('render', middleware.flashMessages);

// Import Route Controllers
const routes = {
	views: importRoutes('./views'),
    tests: importRoutes('./tests'),
    api: importRoutes('./api'),
};

// Setup Route Bindings
exports = module.exports = function (app) {
	// Views
	app.get('/', routes.views.index);

	// /blog/post/
	app.get('/blog/:category?', routes.views.blog);
	app.get('/blog/post/:post', routes.views.post);
	app.all('/about', routes.views.about);
	app.all('/services', routes.views.services);
	app.get('/homepage',routes.views.homepage);
    app.get('/training', routes.views.training);
    app.get('/enroll-with-us', routes.views.enroll);
	app.get('/request-service',routes.views.request_service);
	app.get('/partners/:partner?',routes.views.partner);

	app.get('/test',routes.tests.home);
	app.get('/test/slider',routes.tests.sliders);
	app.get('/test/services-home',routes.tests.services_home);
	app.get('/test/services', routes.tests.services);
	app.get('/test/request-service', routes.tests.request_services);

    app.get('/api/contact', routes.api.contact);
    app.post('/api/contact', routes.api.contact);
	app.post('/api/request-service', routes.api.request_service)
	app.post('/api/enroll-with-us', routes.api.enroll_with_us)

	// NOTE: To protect a route so that only admins can see it, use the requireUser middleware:
	// app.get('/protected', middleware.requireUser, routes.views.protected);

};
