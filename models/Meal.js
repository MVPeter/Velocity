const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Meal extends Model {

    };
    Meal.init({
        dayOf: DataTypes.STRING,
        mealTime: DataTypes.STRING,
    },
    {
        sequelize,
        modelName: 'Meal',
    }
    
);
Meal.associate = (models) => {
    models.Meal.belongsTo(models.User, { foreignKey: "user_id" })
    models.Meal.belongsTo(models.Food, {foreignKey: "food_id"})
    
  }
    return Meal
}