 const mongoose = require('mongoose');
 mongoose.connect('mongodb+srv://roothms:hms@hms.vgtnq.mongodb.net/test'/*'mongodb://localhost:27017/Hms'*/, { useUnifiedTopology: true, useNewUrlParser: true }
 ).then(() => {
   console.log('MongoDB Connection Succeeded.');
 }).catch((err) => {
    console.log('Error in DB connection : ' + err);
 });

//const mongoose = require('mongoose');
//mongoose.connect('mongodb://localhost:27017/Hms', { useUnifiedTopology: true, useNewUrlParser: true }
//).then(() => {
//    console.log('MongoDB Connection Succeeded.');
//}).catch((err) => {
//    console.log('Error in DB connection : ' + err);
//});


mongoose.set('useFindAndModify', false);
require('./patient.schema');

//mongo db connection 

