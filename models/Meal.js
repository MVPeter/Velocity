const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Meal extends Model {

    };
    Meal.init({
        meal: DataTypes.STRING,
        dayOf: DataTypes.STRING,
        mealTime: DataTypes.STRING,
        description: DataTypes.STRING,
        serving_size: DataTypes.STRING,
        // THESE WILL NEED TO BE DECIMAL
        calories: DataTypes.DECIMAL(5,2),
        carbs: DataTypes.DECIMAL(5,2),
        fat: DataTypes.DECIMAL(5,2),
        sodium: DataTypes.DECIMAL(5,2),
    },{
        sequelize,
        modelName: 'Meal',
    });
    return Meal
}