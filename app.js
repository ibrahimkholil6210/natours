const express = require('express');
const app = express();
const fs = require('fs');

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

app.route('/api/v1/tours').get(readAllTours).post(createNewTour);
app
  .route('/api/v1/tours/:id')
  .get(readAllTours)
  .patch(updateSingleTour)
  .delete(deleteSingleTour);

const prot = 8000;
app.listen(prot, () => {
  console.log('Server is running at port 8000');
});
