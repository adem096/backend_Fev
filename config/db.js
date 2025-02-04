const mongoose = require('mongoose');

module.exports.connectToMongoDb = async () => {
    mongoose.set('strictQuery', false);
    mongoose.connect('mongodb://localhost:27017/backendFev')
        .then(
            () => { console.log("connect to db") }
        )
        .catch((err) => {
            console.log(err);
        });
};