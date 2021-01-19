require('./db');
const mongoose = require('mongoose');
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const Unit = mongoose.model('Unit');
const Team = mongoose.model('Team');

const app = express();

// enable sessions
const session = require('express-session');
const sessionOptions = {
    secret: 'secret cookie thang (store this elsewhere!)',
    resave: true,
    saveUninitialized: true
};
app.use(session(sessionOptions));

const publicPath = path.resolve(__dirname, "public");
app.use(express.static(publicPath));
app.use(express.urlencoded({ extended: false}));
app.use(express.json());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// body parser setup
app.use(bodyParser.urlencoded({ extended: false }));

// serve static files
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  if(req.query.teamname == null) {
    Team.find(function(err, vres, count) {
      res.render('index', {teams: vres});
    });
  } else {
    Team.find({name: req.query.teamname}, function(err, vres, count) {
      res.render('index', {teams: vres});
    });
  }
});

app.get('/create_team', (req, res) => {
  res.render('create_team');
});

var activeTeam = null;

var teamArr = [];

app.get('/error', (req, res) => {
  res.render('error');
})

app.post('/create_team', (req, res) => {
  let temp = {'user': req.body.user, 'name': req.body.name, 'createdAt': new Date(), 'units': []}
  Team.insertMany({'user': req.body.user, 'name': req.body.name, 'createdAt': new Date(), 'units': []});
  teamArr.push(temp);
  res.redirect('/');
})

app.get('/unit_list', (req, res) => {
  if(req.query !== null) {
    activeTeam = req.query.name;
  }
  if(activeTeam !== null) {
    Team.find({name: activeTeam}, function(err, vres, count) {
      res.render('unit_list', {units_list: vres[0].units});
    });
  } else {
    res.redirect('/error');
  }
});

app.get('/unit_list/unit', (req, res) => {
  if(activeTeam !== null) {
    Team.find({name: activeTeam}, function(err, vres, count) {
      const found = vres[0].units.find(x => x.name === req.query.name);
      res.render('unit_info', {entry: found, activeName: activeTeam});
    })
  } else {
    res.redirect('/error');
  }
});

app.get('/unit_list/create_unit', (req, res) => {
  if(activeTeam !== null) {
    res.render('create_unit');
  } else {
    res.redirect('/error');
  }
})

var unitArr = [];

app.post('/unit_list/create_unit', (req, res) => {
  //let temp = {'name': req.body.name, 'pilots': req.body.pilots, 'type': req.body.type, 'attacks': req.body.attacks, 'HP': req.body.HP};
  if(activeTeam !== null) {
    var addUnit = new Unit({'name': req.body.name, 'pilots': req.body.pilots, 'type': req.body.type, 'attacks': req.body.attacks, 'HP': req.body.HP});
    unitArr.push(addUnit);
    Team.updateOne(
      {name: activeTeam},  
      {$push: {units: [addUnit]}},
      function(err, results) {
        if(err) {
          console.log('failed');
        } else {
          console.log('passed');
        }
      }
    );
    res.redirect('/unit_list?name='+activeTeam);
  } else {
    res.redirect('/error')
  }
});

app.listen(process.env.PORT || 3000);