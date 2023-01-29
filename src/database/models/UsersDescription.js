module.exports = (sequelize, dataTypes) => {
    let alias = 'UsersDescription';
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: dataTypes.STRING
        },
        description: {
            type: dataTypes.STRING
        },
    };
    let config = {
        tableName: 'usersdescription',
        timestamps: false,
    };
    const UsersDescription = sequelize.define(alias, cols, config)


    return UsersDescription
}