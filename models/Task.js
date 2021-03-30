
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Task extends Model {


    };
    Task.init({
        task_name: DataTypes.STRING,
        task_notes: DataTypes.STRING,
        dayOf: DataTypes.STRING,
        task_complete: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
    },
        {
            sequelize,
            modelName: 'Task',
        }
    );
    Task.associate = (models) => {
        models.Task.belongsTo(models.User, { foreignKey: "user_id" })
    }
    return Task;
};