module.exports = (sequelize, dataTypes) => {
    let alias = 'ProductColors';
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        idproduct: {
            type: dataTypes.INTEGER,
        },
        idcolor: {
            type: dataTypes.STRING
        }
    };
    let config = {
        tableName: 'productcolors',
        timestamps: false
    };
    const ProductColors = sequelize.define(alias, cols, config)

    
    ProductColors.associate  = function (models){
        ProductColors.hasMany (models.Colors,{
            as: 'Colores',
            foreignKey:'id',
            otherKey:'idproduct',
            timestamps: false
        })
    }
    return ProductColors
}