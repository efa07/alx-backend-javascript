const http = require('http');
const countStudents = require('./3-read_file_async');

const app = http.createServer(async (req, res) => {
  if (req.method === 'GET') {
    if (req.url === '/') {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'text/plain');
      res.end('Hello Holberton School!\n');
    } else if (req.url === '/students') {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'text/plain');
      res.write('This is the list of our students\n');

      try {
        await countStudents('database.csv');
      } catch (error) {
        res.statusCode = 500;
        res.end('Cannot load the database\n');
        return;
      }

      res.end();
    } else {
      res.statusCode = 404;
      res.setHeader('Content-Type', 'text/plain');
      res.end('Not Found\n');
    }
  } else {
    res.statusCode = 405;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Method Not Allowed\n');
  }
});

app.listen(1245, () => {
  console.log('Server running at http://localhost:1245/');
});

module.exports = app;
