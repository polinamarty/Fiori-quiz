const path = require('path');

const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());

const port = 8001;

app.get('/api/course', (req, res) => {
  res.sendFile(path.join(__dirname, 'data', 'course.json'));
});
app.get('/api/402', (req, res) => {
  res.sendFile(path.join(__dirname, 'data', '402.json'));
});
app.get('/api/403', (req, res) => {
  res.sendFile(path.join(__dirname, 'data', '403.json'));
});
app.get('/api/410', (req, res) => {
  res.sendFile(path.join(__dirname, 'data', '410.json'));
});
app.listen(port, () => {
  console.log(`[questions] API listening on port ${port}.`);
});
