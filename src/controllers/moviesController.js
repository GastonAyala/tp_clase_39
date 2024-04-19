const path = require('path');
const db = require('../database/models');
const sequelize = db.sequelize;
const { Op } = require("sequelize");


//Aqui tienen una forma de llamar a cada uno de los modelos
// const {Movies,Genres,Actor} = require('../database/models');

//Aquí tienen otra forma de llamar a los modelos creados
// const Movies = db.Movie;
// const Genres = db.Genre;
// const Actors = db.Actor;

 module.exports = {
    list: (req, res) => {
        db.Movie.findAll()
            .then(movies => {
                res.render('movies/moviesList.ejs', {movies})
            })
    },
    detail: (req, res) => {
        db.Movie.findByPk(req.params.id, {
            include: [
                {
                    association: 'genre',
                    attributes: ['name']
                }
            ]
        })
            .then(movie => {
                res.render('movies/moviesDetail.ejs', {movie});
            });
    },
    new: (req, res) => {
        db.Movie.findAll({
            order : [
                ['release_date', 'DESC']
            ],
            limit: 5
        })
            .then(movies => {
                res.render('movies/newestMovies', {movies});
            });
    },
    recomended: (req, res) => {
        db.Movie.findAll({
            where: {
                rating: {[db.Sequelize.Op.gte] : 8}
            },
            order: [
                ['rating', 'DESC']
            ]
        })
            .then(movies => {
                res.render('movies/recommendedMovies.ejs', {movies});
            });
    },
    //Aqui dispongo las rutas para trabajar con el CRUD
    add: (req, res) => {
        db.Genre.findAll()
        .then(allGenres => {
            res.render('movies/moviesAdd', {allGenres})
        })
        .catch(err => {
            res.send(err.message)
        })
    },
    create: (req,res)  => {
        const { validationResult } = require('express-validator');
        const errors = validationResult(req);
        if (errors.isEmpty()) {
            const { title, rating, awards, release_date, length, genre_id } = req.body;
            db.Movie.create({
                title,
                rating,
                length,
                awards,
                release_date,
                genre_id
            })
            .then(() => {
                res.redirect('/movies')
            })
            .catch(err => {
                res.send(err.message)
            })
        } else {
            db.Genre.findAll()
            .then(allGenres => {
                return res.render('movies/moviesAdd', { allGenres, old: req.body, errors: errors.mapped() })
            })
            .catch(err => {
                res.send(err.message)
            })
        }
    },
    edit: (req, res) => {
        const { id } = req.params;
        db.Movie.findByPk(id)
        .then(Movie => {
            db.Genre.findAll()
            .then(allGenres => {
                res.render('movies/moviesEdit', { Movie, allGenres })

            })
        })
        .catch(err => {
            res.send(err.message)
        })
    },
    update: (req, res)  => {
        const { id } = req.params;
        const { title, rating, awards, release_date, length, genre_id } = req.body;
        const { validationResult } = require('express-validator');
        const errors = validationResult(req);
        if(errors.isEmpty()) {
            db.Movie.update(
                {
                    title,
                    rating,
                    length,
                    awards,
                    release_date,
                    genre_id
                },
                {
                    where: {id}
                }
            )
            .then(() => {
                res.redirect('/movies')
            })
            .catch(err => {
                res.send(err.message)
            })
        } else {
            db.Movie.findByPk(id)
            .then((Movie) => {
                db.Genre.findAll()
                .then(allGenres => {
                    return res.render('movies/moviesEdit', {
                        Movie,
                        allGenres,
                        old: req.body,
                        id,
                        errors: errors.mapped()
                    })
                })
                .catch(err => {
                    res.send(err.message)
                })
            })
            
        }
        
    },
    delete: (req, res)  => {
        const { id } = req.params;
        db.Movie.findByPk(id)
        .then(Movie => {
            res.render('movies/moviesDelete', { Movie })
        })
        .catch((err) => {
            res.send(err.message)
        })
    },
    destroy: (req, res)  => {
        const { id } = req.params;
        db.Movie.destroy({
            where: {id}
        })
        .then(() => {
            res.redirect('/movies')
        })
        .catch((err) => {
            res.send(err.message)
        })
    }
}
