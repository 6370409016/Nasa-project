const https = require('https');

exports.handler = function (event, context, callback) {
  const inputDate = event.queryStringParameters.date;
  const apikey = process.env.NASA_API_KEY;
  const url = 'https://api.nasa.gov/planetary/apod?api_key=' + apikey + '&date=' + inputDate;

  https.get(url, function (response) {
    let data = '';

    response.on('data', chunk => {
      data += chunk;
    });

    response.on('end', () => {
      const nasaData = JSON.parse(data);
      callback(null, {
        statusCode: 200,
        body: JSON.stringify(nasaData)
      });
    });

    response.on('error', error => {
      console.error(error);
      callback(error);
    });
  });
};
