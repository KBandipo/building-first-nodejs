var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

var post = [
  { id: '1', day: 'Monday', task: 'Learn React' },
  { id: '2', day: 'Tuesday', task: 'Learn Next.js' },
  { id: '3', day: 'Wednesday', task: 'Learn Node.js' },
  { id: '4', day: 'Thursday', task: 'Learn SASS' },
];

app.get('/', function (request, response) {
  response.send(post);
});

app.listen(3030, function () {
  console.log('First API running on port 3030!');
});
