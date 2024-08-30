const express = require('express');
const bodyParser = require('body-parser');
const https = require('https');
const ejs = require('ejs');
const dotenv = require('dotenv')

dotenv.config();

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('public'));

app.set('view engine', 'ejs');

let inputDate = "";

app.get('/', function (req, res) {
  // res.sendFile(__dirname+'/index.html');

  const date = new Date();
  const currentDate = date.toJSON().slice(0, 10);

  const apikey = process.env.NASA_API_KEY;
  console.log(apikey);
  // apiKey=keyFile.config();
  url = 'https://api.nasa.gov/planetary/apod?api_key=' + apikey + '&date=' + inputDate;

  https.get(url, function (response) {
    response.on("data", function (data) {
      const nasaData = JSON.parse(data);
      const imageUrl = nasaData.hdurl;
      const title = nasaData.title;
      const abouImage = nasaData.explanation;
      res.render("IOD", {
        picTitle: title,
        image: imageUrl,
        about: abouImage,
        currentDate: currentDate,
      });
      // console.log("statusCode- " + response.statusCode);
    });


  });


});

app.post('/', function (req, res) {
  inputDate = req.body.date;
  res.redirect('/');
});


app.listen(3000, function () {
  console.log('Sever started at port no 3000');
});
