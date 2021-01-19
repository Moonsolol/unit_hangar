// 1ST DRAFT DATA MODEL
const mongoose = require('mongoose');

// users
// * our site requires authentication...
// * so users have a username and password
// * they also can have 0 or more teams
const User = new mongoose.Schema({
  // username provided by authentication plugin
  // password hash provided by authentication plugin
  lists:  [{ type: mongoose.Schema.Types.ObjectId, ref: 'Team' }]
});

// an unit in a team
// * includes name, pilots, type, number of attacks, and health points
// * units can be added or removed from the team
const Unit = new mongoose.Schema({
  name: {type: String, required: true},
  pilots: {type: String, required: true},
  type: {type: String, required: true},
  attacks: {type: Number, required: true},
  HP: {type: Number, required: true}
}, {
  _id: true
});

// a team
// * each team must have a related user
// * a team can have 0 or more items
const Team = new mongoose.Schema({
  user: {type: mongoose.Schema.Types.ObjectId, ref:'User'},
  name: {type: String, required: true},
  createdAt: {type: Date, required: true},
  units: {type: [Unit], required: true}
});

mongoose.model('Unit', Unit);
mongoose.model('Team', Team);

// is the environment variable, NODE_ENV, set to PRODUCTION? 
let dbconf;
if (process.env.NODE_ENV === 'PRODUCTION') {
 // if we're in PRODUCTION mode, then read the configration from a file
 // use blocking file io to do this...
 const fs = require('fs');
 const path = require('path');
 const fn = path.join(__dirname, 'config.json');
 const data = fs.readFileSync(fn);

 // our configuration file will be in json, so parse it and set the
 // conenction string appropriately!
 const conf = JSON.parse(data);
 dbconf = conf.dbconf;
} else {
 // if we're not in PRODUCTION mode, then use
 dbconf = 'mongodb://localhost/tjs529';
}

mongoose.connect(dbconf);

//
// TODO: add remainder of setup for slugs, connection, registering models, etc. below

