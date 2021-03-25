const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Meal extends Model {

    };
    Meal.init({
        dayOf: DataTypes.STRING,
        mealTime: DataTypes.STRING,
    },{
        sequelize,
        modelName: 'Meal',
    });
    return Meal
}