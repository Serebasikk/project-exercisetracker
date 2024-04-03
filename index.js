require('dotenv').config();
const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require("body-parser")
const mongoose = require('mongoose')

require('dotenv').config()
const router = require('./route');

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

const mongoSchema = {};
mongoSchema.user = require('./mongoSchema/user.json');
mongoSchema.exercises = require('./mongoSchema/exercises.json');

const userSchema = new mongoose.Schema(mongoSchema.user);
const User = mongoose.model('users', userSchema);

const exercisesSchema = new mongoose.Schema(mongoSchema.exercises);
const Exercises = mongoose.model('exercises', exercisesSchema);

app.use((req, res, next) => {
  req.mongoose = {};
  req.mongoose.user = User;
  req.mongoose.exercises = Exercises;
  req.mongoose.schema = mongoSchema;
  next();
});

app.use(bodyParser.urlencoded({ extended: "false" }));
app.use(cors())
app.use(express.static('public'))
app.use('/api', router);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html')
});


const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port)
})
