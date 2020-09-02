const fs = require('fs');

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`, 'utf-8')
);

//Middleware

exports.checkId = (req, res, next, val) => {
  const tour = tours.find((el) => el.id * 1 === val * 1);
  !tour
    ? res.status(404).json({ status: 'failed', message: 'Invalid ID' })
    : next();
};

exports.checkValidity = (req, res, next) => {
  req.body.name && req.body.price
    ? next()
    : res
        .status(400)
        .json({
          status: 'failed',
          message: 'Bad request! missing credentials....',
        });
};

exports.readAllTours = (req, res) => {
  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: {
      tours,
    },
  });
};

exports.createNewTour = (req, res) => {
  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);

  tours.push(newTour);

  fs.writeFile(
    `${__dirname}/../dev-data/data/tours-simple.json`,
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

exports.readSigleTour = (req, res) => {
  const id = req.params.id * 1;
  const tour = tours.find((el) => el.id === id);
  res.status(200).json({ status: 'success', data: { tour } });
};

exports.updateSingleTour = (req, res) => {
  const id = req.params.id * 1;
  const tour = tours.find((el) => el.id === id);
  res.status(200).json({ status: 'success', data: { tour } });
};

exports.deleteSingleTour = (req, res) => {
  res.status(204).json({ status: 'success', data: null });
};
