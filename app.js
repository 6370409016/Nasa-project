const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('public'));

app.set('view engine', 'ejs');

let inputDate = '';

app.get('/', function (req, res) {
  const date = new Date();
  const currentDate = date.toJSON().slice(0, 10);
  res.render("IOD", {
    picTitle: 'Default Title',
    image: 'Default Image URL',
    about: 'Default Explanation',
    currentDate: currentDate,
  });
});

app.listen(3000, function () {
  console.log('Server started at port no 3000');
});
