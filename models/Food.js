const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Food extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */

    };
    Food.init({
        meal: DataTypes.STRING,
        description: DataTypes.STRING,
        serving_size: DataTypes.STRING,
        // THESE WILL NEED TO BE DECIMAL
        calories: DataTypes.DECIMAL(5,2),
        carbs: DataTypes.DECIMAL(5,2),
        protein: DataTypes.DECIMAL(5,2),
        fat: DataTypes.DECIMAL(5,2),
        sodium: DataTypes.DECIMAL(5,2),
    }, {
        sequelize,
        modelName: 'Food',
        timestamps: false,
    }
    );
    Food.associate = (models) => {
        models.Food.hasMany(models.Meal, { foreignKey: "food_id" })
        
      }
    return Food;
};