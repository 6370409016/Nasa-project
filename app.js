const express= require('express');
const bodyParser=require('body-parser');
const https=require('https');
const ejs= require('ejs');

const app= express();

app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static('public'));

app.set('view engine', 'ejs');

app.get('/', function(req, res){
  // res.sendFile(__dirname+'/index.html');

  apiKey=config.MY_KEY;
  url= 'https://api.nasa.gov/planetary/apod?api_key='+apiKey;

  https.get(url, function(response){
    response.on("data", function(data){
      const nasaData=JSON.parse(data);
      const imageUrl= nasaData.hdurl;
      const title=nasaData.title;
      const abouImage= nasaData.explanation;
      res.render("IOD", {
        picTitle:title,
        image:imageUrl,
        about:abouImage,

      });

    });


  });


});



app.listen(3000, function(){
  console.log('Sever started at port no 3000');
});
