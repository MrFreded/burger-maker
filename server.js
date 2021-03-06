const mongoose = require('mongoose');
const express = require('express');
const path = require('path');

const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });

const app = require('./app');

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
  })
  .then(con => console.log('DB connection!'));

app.use(express.static(path.join(__dirname, 'client/build')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/client/build/index.html'));
});

//  START SERVER
const port = process.env.PORT || 8000;

const server = app.listen(port, () => {
  console.log(`App running on port ${port}......`);
});

// unhandled reject events or promises like false password for db connection(for async functions) server promise
process.on('unhandledRejection', err => {
  console.log('UNHANDLED REJECTION', err);
  server.close(() => {
    process.exit(1);
  });
});
