module.exports = (sequelize, dataTypes) => {
    let alias = 'Users';
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        firstname: {
            type: dataTypes.STRING
        },
        lastname: {
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
        category: {
            type: dataTypes.INTEGER,
        },
    };
    let config = {
        tableName: 'Users',
    };
    const Users = sequelize.define(alias, cols, config)


    return Users
}