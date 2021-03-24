module.exports = (sequelize, DataTypes) => {
    const Date= sequelize.define('Date',  {

        day: DataTypes.DATEONLY,
    }),

    return Date;
};