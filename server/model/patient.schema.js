const mongoose = require('mongoose');
var pschema = new mongoose.Schema({
    firstname:
{
        type: String
    },
    lastname:
    {
        type: String
    },
    prescription:
    [{
        type: String
    }],
    cnumber: {
        type: String
    },
    visits:{
        type: Number
    }
});

mongoose.model('hms', pschema);