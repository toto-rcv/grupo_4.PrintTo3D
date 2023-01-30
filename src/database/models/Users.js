module.exports = (sequelize, dataTypes) => {
    let alias = 'Users';
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: dataTypes.STRING
        },
        apellido: {
            type: dataTypes.STRING
        },
        email: {
            type: dataTypes.STRING
        },
        image: {
            type: dataTypes.STRING
        },
        password: {
            type: dataTypes.STRING
        },
        id_level: {
            type: dataTypes.INTEGER,
        },
    };
    let config = {
        tableName: 'Users',
        timestamps: false,
    };
    const Users = sequelize.define(alias, cols, config)


    return Users
}