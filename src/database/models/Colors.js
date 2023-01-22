module.exports = (sequelize, dataTypes) => {
    let alias = 'Colors';
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        color: {
            type: dataTypes.STRING
        }
    };
    let config = {
        tableName: 'colors',
        timestamps: false
    };
    const Colors = sequelize.define(alias, cols, config)

 

   
    return Colors
}