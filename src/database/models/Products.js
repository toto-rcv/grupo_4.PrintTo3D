module.exports = (sequelize, dataTypes) => {
    let alias = 'Products';
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: dataTypes.STRING
        },
        short_description: {
            type: dataTypes.STRING
        },
        long_description: {
            type: dataTypes.STRING
        },
        image: {
            type: dataTypes.STRING
        },
        price: {
            type: dataTypes.FLOAT
        },
        id_category: {
            type: dataTypes.INTEGER,
        },
    };
    let config = {
        tableName: 'Products',
        timestamps: false,
    };
    const Products = sequelize.define(alias, cols, config)
/*
    Products.associate  = function (models){
        Products.belongsTo (models.ProductsCategory,{
            as:'productscategory',
            foreignKey:'id'
        }),
        Products.belongsToMany (models.Colors,{
            as:'colors',
            through: 'id',
            foreignKey:'idproducto',
            timestamps: false
        })
    }

*/
    return Products
}