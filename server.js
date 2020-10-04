const dotenv = require('dotenv');
const mongoose = require('mongoose');
dotenv.config({ path: './config.env' });
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
  })
  .catch((err) => console.log(err));

const port = process.env.PORT || 3030;

app.listen(port, () => {
  if (process.env.NODE_ENV.trim() == 'production') {
    console.log(
      'Danger::In Production! application running on port:' + process.env.PORT
    );
  } else {
    console.log('Application runing on port:' + process.env.PORT);
  }
});
