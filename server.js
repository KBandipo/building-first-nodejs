var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

var postsData = [
  { id: '1', day: 'Monday', task: 'Learn React' },
  { id: '2', day: 'Tuesday', task: 'Learn Next.js' },
  { id: '3', day: 'Wednesday', task: 'Learn Node.js' },
  { id: '4', day: 'Thursday', task: 'Learn SASS' },
];

// Handle Get Request
app.get('/posts', function (request, response) {
  response.send(postsData);
});

// Handle Post Request
app.post('/posts', function (request, response) {
  var post = request.body;
  if (!post || !post.day || post.day === '' || !post.task || post.task === '') {
    response
      .status(500)
      .send({ error: "You can't send an empty text for the day and task" });
  } else {
    postsData.push(post);
    response.status(200).send(post);
  }
});

// Handle Put Request
app.put('/posts/:postId', function (request, response) {
  var newTask = request.body.task;
  var newDay = request.body.day;

  if (!newTask || newTask === '' || !newDay || newDay === '') {
    response.status(500).send({ error: 'You must povide post task and day' });
  } else {
    var objectFound = false;
    for (var x = 0; x < postsData.length; x++) {
      var toDo = postsData[x];
      if (toDo.id === request.params.postId) {
        postsData[x].task = newTask;
        postsData[x].day = newDay;
        objectFound = true;
        break;
      }
    }
    if (!objectFound) {
      response.status(500).send({ error: 'Postid not found' });
    } else {
      response.send(postsData);
    }
  }
});

// Handle Delete Request
app.delete('/posts/:postId', function (request, response) {
  postId = request.params.postId;
  var initialLength = postsData.length;
  postsData = postsData.filter((post) => post.id !== postId);

  if (initialLength === postsData.length) {
    response.status(404).send({ error: 'Post id not found' });
  } else {
    response.status(200).send({ message: 'Post successful', posts: postsData });
  }
});

app.listen(3030, function () {
  console.log('First API running on port 3030!');
});
