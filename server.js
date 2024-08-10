var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

var posts = [
  { id: '1', day: 'Monday', task: 'Learn React' },
  { id: '2', day: 'Tuesday', task: 'Learn Next.js' },
  { id: '3', day: 'Wednesday', task: 'Learn Node.js' },
  { id: '4', day: 'Thursday', task: 'Learn SASS' },
];

app.get('/', function (request, response) {
  response.send(posts);
});

app.post('/post', function (request, response) {
  var post = request.body;
  if (!post || post.day === '' || post.task === '') {
    response
      .status(500)
      .send({ error: "You can't send an empty text for the day and task" });
  } else {
    posts.push(post);
    response.status(200).send(post);
  }
});

app.listen(3030, function () {
  console.log('First API running on port 3030!');
});
