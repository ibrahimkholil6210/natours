const app = require('./app');

const prot = 8000;
app.listen(prot, () => {
  console.log('Server is running at port 8000');
});
