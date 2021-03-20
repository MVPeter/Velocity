const connection = require('./connection.js');



const orm = {
    all(tableInput, cb) {
        const queryString = 'SELECT * FROM ??;';
        connection.query(queryString,
            [tableInput],
            (err, result) => {
                if (err) { throw err; }
                cb(result);
            }
        );
    },


    create(table, cols1, vals1, cb) {
        const queryString = 'INSERT INTO ?? (??) VALUES (?)';
        connection.query(
            queryString,
            [table, cols1, vals1],
            (err, result) => {
                if (err) { throw err; }
                cb(result);
            }
            );
            
    },

 
    updateEaten(objColVals, condition, cb) {
        let queryString = 'UPDATE burger SET eaten = ? WHERE id = ?';
        connection.query(queryString,
            [objColVals, condition],
            (err, result) => {
                if (err) {
                    throw err;
                }
                cb(result);
            }
        );
    },
};

module.exports = orm;
