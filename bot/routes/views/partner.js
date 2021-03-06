const keystone = require('keystone');

exports = module.exports = function (req, res) {

    const view = new keystone.View(req, res);
    const locals = res.locals;

    locals.data = {
        partner: [],
    };

    locals.filters = {
        slug: req.params.partner
    };
    locals.title = 'Bot - Partners';


    view.on('init', function (next) {

        const q = keystone.list('Partner').model.findOne({

            slug: locals.filters.slug
        });

        console.log('typeof ', typeof locals.filters.slug)

        q.exec(function (err, results) {
            locals.data.partner = results;
            if (typeof locals.filters.slug === 'undefined') {
                res.redirect('/');

            }
            next(err);
        });

    });

    //CHANGE VIEW LATER
    view.render('partner');
}

