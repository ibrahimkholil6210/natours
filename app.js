const express = require('express');
const app = express();
const fs = require('fs');
const morgan = require('morgan');

app.use(morgan('dev'));
app.use(express.json());
app.use((req, res, next) => {
  req.reqTime = new Date().toISOString();
  next();
});

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`, 'utf-8')
);

const readAllTours = (req, res) => {
  console.log(req.reqTime);
  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: {
      tours,
    },
  });
};

const createNewTour = (req, res) => {
  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);

  tours.push(newTour);

  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      res.status(201).json({
        status: 'success',
        data: {
          newTour,
        },
      });
    }
  );
};

const readSigleTour = (req, res) => {
  const id = req.params.id * 1;
  const tour = tours.find((el) => el.id === id);
  !tour
    ? res.status(404).json({ status: 'failed', message: 'Invalid ID' })
    : res.status(200).json({ status: 'success', data: { tour } });
};

const updateSingleTour = (req, res) => {
  const id = req.params.id * 1;
  const tour = tours.find((el) => el.id === id);
  !tour
    ? res.status(404).json({ status: 'failed', message: 'Invalid ID' })
    : res.status(200).json({ status: 'success', data: { tour } });
};

const deleteSingleTour = (req, res) => {
  const id = req.params.id * 1;
  const tour = tours.find((el) => el.id === id);
  !tour
    ? res.status(404).json({ status: 'failed', message: 'Invalid ID' })
    : res.status(204).json({ status: 'success', data: null });
};

const readAllUsers = (req, res) => {
  res.status(500).json({ status: 'error', message: "Can't handle this route" });
};

const createNewUser = (req, res) => {
  res.status(500).json({ status: 'error', message: "Can't handle this route" });
};

const readSigleUser = (req, res) => {
  res.status(500).json({ status: 'error', message: "Can't handle this route" });
};

const updateSingleUser = (req, res) => {
  res.status(500).json({ status: 'error', message: "Can't handle this route" });
};

const deleteSingleUser = (req, res) => {
  res.status(500).json({ status: 'error', message: "Can't handle this route" });
};

const tourRouter = express.Router();
const userRouter = express.Router();

tourRouter.route('/').get(readAllTours).post(createNewTour);
tourRouter
  .route('/:id')
  .get(readSigleTour)
  .patch(updateSingleTour)
  .delete(deleteSingleTour);

userRouter.route('/').get(readAllUsers).post(createNewUser);
userRouter
  .route('/:id')
  .get(readSigleUser)
  .patch(updateSingleUser)
  .delete(deleteSingleUser);

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

const prot = 8000;
app.listen(prot, () => {
  console.log('Server is running at port 8000');
});
