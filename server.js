const dotenv = require('dotenv');
const mongoose = require('mongoose');
dotenv.config({ path: './config.env' });

process.on('uncaughtException', (err) => {
  console.log(
    'UNCAUGHT EXCEPTION OCCURED : Shutting down! application got burnt'
  );
  console.log(err.name, err.message);
  process.exit(1);
});

const app = require('./app');

const DB = process.env.DB.replace('<PASSWORD>', process.env.DB_PASSWORD);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then((con) => {
    console.log('DB connection established!');
  });

const port = process.env.PORT || 3030;

const server = app.listen(port, () => {
  if (process.env.NODE_ENV.trim() == 'production') {
    console.log(
      'Danger::In Production! application running on port:' + process.env.PORT
    );
  } else {
    console.log('Application runing on port:' + process.env.PORT);
  }
});

process.on('unhandledRejection', (err) => {
  console.log(
    'UNHANDLED REGECTION OCCURED : Shutting down! application got burnt'
  );
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
