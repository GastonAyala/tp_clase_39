module.exports = (sequelize, dataTypes) => {
    const alias = 'ActorMovie';
    const cols = {
        id: {
            type: dataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        actor_id: {
            type: dataTypes.INTEGER.UNSIGNED,
            references: {
                model:  'Actor',
                key: 'id'
            }
        },
        movie_id: {
            type: dataTypes.INTEGER.UNSIGNED,
            references: {
                model: 'Movie',
                key: 'id'
            }
        }
    };
    const config = {
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: false,
        tableName: 'actor_movie',
        underscored: true
    }

    const ActorMovie = sequelize.define(alias, cols, config);

    ActorMovie.associate = (models) => {
        ActorMovie.belongsTo(models.Movie, {
            foreingkey: 'movie_id'
        })

        ActorMovie.belongsTo(models.Actor, {
            foreingkey: 'actor_id'
        })
    }

    return ActorMovie

}
