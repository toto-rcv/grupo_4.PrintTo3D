module.exports = (sequelize, dataTypes) => {
    let alias = 'ProductColors';
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        id_product: {
            type: dataTypes.INTEGER,
        },
        id_color: {
            type: dataTypes.INTEGER
        }
    };
    let config = {
        tableName: 'productscolors',
        timestamps: false
    };
    const ProductColors = sequelize.define(alias, cols, config)

    
    ProductColors.associate  = function (models){
        ProductColors.hasMany(models.Colors,{
            as: 'Colores',
            foreignKey:'id',
            sourceKey: 'id_color',
            timestamps: false
        })
    }    
    return ProductColors
}