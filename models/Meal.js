const Sequelize = require('sequelize')

const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Meal extends Model {

    };
    Meal.init({
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        // user_id:
        // {
        //     type: DataTypes.INTEGER,
        //     references: {
        //         model: "user",
        //         key: "id"
        //     }
        // },
        calorie:
        {
            type: DataTypes.INTEGER
        },
        serving:
        {
            type: DataTypes.DECIMAL(10, 2)
        }, 
    },{
    sequelize,
    modelName: 'Meal',
    }
    )
    return Meal;
}
