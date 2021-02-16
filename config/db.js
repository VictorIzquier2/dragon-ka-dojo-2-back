const mongoose = require('mongoose');
require('dotenv').config({path: '.env'});

const conectarDB = async () => {
  try{
    await mongoose
      .connect(process.env.DB_MONGO, {
        useCreateIndex: true,
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false
      })
    console.log('DB Conectada');
  }catch(err){
    console.log('Hubo un error', err);
    process.exit(1); // detener la app
  }
}

mongoose.connection.on('connected', () => {
  console.log('Mongoose default connection open');
});

mongoose.connection.on('error', (error) => {
  console.log('Mongoose default connection error: ', error);
});

mongoose.connection.on('disconnected', () => {
  console.log('Mongoose default connection disconnected');
});

process.on('SIGINT', () => {
  mongoose.connection.close(() => {
    console.log('Mongoose default connection disconnected through app termination');
    process.exit(0);
  })
});


module.exports = conectarDB;
