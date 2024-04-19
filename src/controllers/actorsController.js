const db = require('../database/models');
const { Op } = db.Sequelize;


module.exports = {
    list: (req, res) => {
        db.Actor.findAll()
        .then(actors => {
            res.render('actors/actorsList', { actors })
        })
        .catch(err => {
            res.send(err.message)
        })
    },
    detail: (req, res) => {
        const { id } = req.params;
        db.Actor.findByPk(id, {
            include: [
                {
                    association: 'movie',
                    attributes: ['title', 'id']
                }
            ],
        })
        .then(actor => {
            db.Movie.findAll()
            .then(movies => {
                res.render('actors/actorsDetail', { actor, movies })
            })
        })
        .catch(err => {
            res.send(err.message)
        })
    },
    add: (req, res) => {
        db.Movie.findAll()
        .then(movies => {
            res.render('actors/actorsAdd', { movies })
        })
        .catch(err => {
            res.send(err.message)
        })
    },
    create: (req, res) => {
        const { validationResult } = require('express-validator');
        const errors = validationResult(req);

        if(errors.isEmpty()) {
            const { first_name, last_name, rating, favorite_movie_id} = req.body;
            db.Actor.create({
                first_name,
                last_name,
                rating,
                favorite_movie_id
            })
            .then(() => {
                res.redirect('/actors')
            })
            .catch(err => {
                res.send(err.message)
            })
        } else {
            db.Movie.findAll()
            .then(movies => {
                return res.render('actors/actorsAdd', {
                    movies,
                    old: req.body,
                    errors: errors.mapped()
                })
            })
            .catch(err => {
                res.send(err.message)
            })
        }
    },
    edit: (req, res) => {
        const { id } = req.params;
        db.Actor.findByPk(id)
        .then(Actor => {
            db.Movie.findAll()
            .then(movies => {
                res.render('actors/actorsEdit', { Actor, movies })
            })
        })
        .catch(err => {
            res.send(err.message)
        })
    },
    update: (req, res) => {
        const { id } = req.params;
        const { first_name, last_name, rating, favorite_movie_id } = req.body;

        db.Actor.update({
            first_name,
            last_name,
            rating,
            favorite_movie_id
        },
        {
            where: {id}
        })
        .then(() => {
            res.redirect('/actors')
        })
        .catch(err => {
            res.send(err.message)
        })
    },
    delete: (req, res) => {
        const { id } = req.params;
        db.Actor.findByPk(id)
        .then(actor => {
            res.render('actors/actorsDelete', { actor })
        })
        .catch(err => {
            res.send(err.message)
        })
    },
    destroy: (req, res) => {
        const { id } = req.params;
        db.Actor.destroy({
            where: {id}
        })
        .then(() => {
            res.redirect('/actors')
        })
        .catch(err => {
            res.send(err.message)
        })
    }
};
