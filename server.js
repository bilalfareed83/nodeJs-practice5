const express = require('express');
const jwt = require('jsonwebtoken');

const app = express();

const PORT = process.env.PORT || 3001;

app.use(express.json());

app.use((req, res, next) => {
  try {
    console.log(req.headers);

    //create token
    const token = jwt.sign({ name: 'Bilal' }, 'ufff');

    const decodeToken = jwt.verify(token, 'ufff');

    req.name = decodeToken.name;
    next();
  } catch (err) {
    res.send(err.message || 'server error');
  }
});

app.get('/', (req, res) => {
  res.send('This is Home page.');
});

app.post('/login', (req, res) => {
  const { username } = req.body;
  if (username === req.name) {
    res.send('This is login page.');
  } else {
    res.send('invalid name');
  }
});

app.listen(PORT, () => {
  console.log(`server running ${PORT}`);
});
