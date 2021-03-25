
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Task extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */

    };
    Task.init({
        task_name: DataTypes.STRING,
        task_notes: DataTypes.STRING,
        task_complete: DataTypes.BOOLEAN
    }, {
        sequelize,
        modelName: 'Task',
    }
    );
    return Task;
};