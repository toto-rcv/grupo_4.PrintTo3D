module.exports = (sequelize, dataTypes) => {
    let alias = 'ProductCategory';
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
        image: {
            type: dataTypes.STRING
        },
    };
    let config = {
        tableName: 'productcategory',
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: false
    };
    const ProductCategory = sequelize.define(alias, cols, config)


    return ProductCategory
}