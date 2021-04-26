const express = require('express');
const authenticate = require('./authUser');
const { ROLE, users } = require('./data');
const projectRoutes = require('./routes/proiects');

const app = express();

const setUser = (req, res, next) => {
  const userID = req.body.userID;

  if(userID) {
    req.user = users.find(user => user.id == userID);
  };
  next();
};

// ====Middleware=====
app.use(express.json());
app.use(setUser);

app.use('/projects', projectRoutes);

app.get('/', (req, res) => {
  res.send('Home Page');
});

app.get('/dashboard', authenticate.authUser, (req, res) => {
  res.send('Dashboard Page');
});

app.get('/admin', authenticate.authUser, authenticate.authRole(ROLE.ADMIN),  (req, res) => {
  res.send('Admin Page');
});



app.listen(3000, () => console.log('Running on port 3000'));
