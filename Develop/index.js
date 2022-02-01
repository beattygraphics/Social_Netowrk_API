const express = require('express');
const mongoose = require('mongoose')
const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use(require('./routes'));

mongoose.connect('mongodb://localhost/social_network', {
  //useFindAndModify: false,
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log("Database connected!"))
.catch(err => console.log(err));;


//console.log("DB STUFF",dbStuff);

// Use this to log mongo queries being executed!
mongoose.set('debug', true);

app.listen(PORT, () => console.log(`🌍 Connected on localhost:${PORT}`));