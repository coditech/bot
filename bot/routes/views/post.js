var keystone = require('keystone');

exports = module.exports = function (req, res) {

    var view = new keystone.View(req, res);
    var locals = res.locals;

    // Set locals
    locals.section = 'blog';
    locals.filters = {
        post: req.params.post,
    };
    locals.title = 'Bot - Blog';

    locals.data = {
        recentPosts: [],
        categories: [],
    };

    // Load the current post
    view.on('init', function (next) {

        var q = keystone.list('Post').model.findOne({
            slug: locals.filters.post,
        }).populate(['author', 'categories']);

        q.exec(function (err, result) {
            locals.data.post = result;
            locals.title = 'Bot - '+ result.title ;

            next(err);
        });

    });

    // Load other posts
    view.on('init', function (next) {

        var q = keystone.list('Post').model.find().where('state', 'published').sort('publishedDate').populate('author').limit(5);

        q.exec(function (err, results) {
            locals.data.recentPosts = results;
            next(err);
        });

    });

    // Load PostCategory
    view.on('init', function (next) {

        var q = keystone.list('PostCategory').model.find();

        q.exec(function (err, results) {
            locals.data.categories = results;
            next(err);
        });

    });

    // Render the view
    view.render('blog/post');
};
