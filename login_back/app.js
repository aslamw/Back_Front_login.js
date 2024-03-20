const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');

const app = express();
app.use(cors());
const PORT = 3000;

app.use(bodyParser.json());

const users = [];

app.post('/register', async (req, res) => {
  const { username, password } = req.body;

  // Check if username already exists
  if (users.find(user => user.username === username)) {
    return res.status(400).json({ message: 'Username already exists' });
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Save user to "database"
  users.push({ username, password: hashedPassword });

  res.status(201).json({ message: 'User registered successfully' });
});

app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  // Check if user exists
  const user = users.find(user => user.username === username);
  if (!user) {
    return res.status(400).json({ message: 'Invalid username or password' });
  }

  // Check password
  if (!(await bcrypt.compare(password, user.password))) {
    return res.status(400).json({ message: 'Invalid username or password' });
  }

  // Generate JWT token
  const token = jwt.sign({ username }, 'secret_key');
  res.json({ token });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
